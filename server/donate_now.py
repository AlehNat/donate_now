from flask import Flask, jsonify
from flask import json
from flask import redirect
from flask import request
from flask import Response
from flask_sqlalchemy import SQLAlchemy
from steem.account import Account
from steembase.exceptions import AccountDoesNotExistsException
from werkzeug.exceptions import Unauthorized, NotFound, BadRequest

from settings import CLIENT_ID, CLIENT_SECRET, SQLALCHEMY_DATABASE_URI
from steemconnect.client import Client
from steemconnect.operations import Comment
from uuid import uuid4

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI.format(app.root_path)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
FE_URL = 'http://localhost:4200/login/success/{}'
app_name = "donate.now/0.0.1"


class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	steem_token = db.Column(db.String(500), unique=True, nullable=False)
	user_id = db.Column(db.String(120), unique=True, nullable=False)

	def __repr__(self):
		return '<User %r>' % self.uder_id


@app.route('/')
def hello_world():
	return 'Homepage'


@app.route('/login')
def login():
	c = Client(
		client_id=CLIENT_ID,
		client_secret=CLIENT_SECRET,
	)
	auth_url = c.get_login_url(
		"http://127.0.0.1:5000/complete/steemconnect/",
		"login,vote,comment,custom_json",
	)
	return redirect(auth_url)


@app.route('/complete/steemconnect/')
def login_complete():
	token = request.args['access_token']
	c = Client(
		access_token=token,
	)
	user_info = c.me()
	create_or_update_user(user_info['name'], token)
	return redirect(FE_URL.format(user_info['name']))


def create_or_update_user(user_id, token):
	user = User.query.filter_by(user_id=user_id).first()
	if not user:
		user = User(user_id=user_id, steem_token=token)
	else:
		user.steem_token = token
	db.session.add(user)
	db.session.commit()


@app.route('/init_db')
def init_db():
	db.create_all()
	return 'db_created'


@app.route('/create_post', methods=['POST'])
def create_post():
	data_dict = json.loads(request.data)
	if 'user_id' not in data_dict:
		raise BadRequest('user_id is mandatory param')
	if 'title' not in data_dict:
		raise BadRequest('title is mandatory param')
	if 'body' not in data_dict:
		raise BadRequest('body is mandatory param')

	user_id = data_dict['user_id']
	title = data_dict['title']
	body = data_dict['body']
	force_permlink = data_dict['force_permlink']
	cover_image_url = data_dict.get('cover_image_url', '')
	user = User.query.filter_by(user_id=user_id).first()
	if not user:
		raise Unauthorized('Not authorized with steemconnect')
	client = Client(access_token=user.steem_token)
	permlink = force_permlink or title.replace(' ', '-').replace('_', '-').encode('ascii', 'ignore')
	if not permlink or len(permlink) < 4:
		permlink = str(uuid4())
	comment = Comment(
		user.user_id,
		permlink,
		"Make donations/tipping easy <a href=\"http://donatenow.io\">donatenow!</a>",
		title=title,
		json_metadata={"app": app_name, "body": body, "cover_image_url": cover_image_url}
	)
	r = client.broadcast([comment.to_operation_structure()])
	if 'error_description' in r and r['error_description']:
		return r['error_description']

	all_posts = get_all(user_id)
	post = all_posts['posts'][permlink]
	response = Response(json.dumps(post), mimetype='application/json')
	response.headers.add('Access-Control-Allow-Origin', '*')
	return response


@app.route('/posts')
def get_posts():
	if 'user_id' not in request.args:
		raise BadRequest('user_id is mandatory param')
	user_id = request.args['user_id']
	post_id = request.args['post_id'] if 'post_id' in request.args else ''
	all = get_all(user_id)

	if post_id:
		posts = all['posts'][post_id]
	else:
		posts = all['posts'].values()

	response = Response(json.dumps(posts), mimetype='application/json')
	response.headers.add('Access-Control-Allow-Origin', '*')
	return response


@app.route('/transfers')
def get_transfers():
	if 'user_id' not in request.args:
		raise BadRequest('user_id is mandatory param')
	user_id = request.args['user_id']

	all = get_all(user_id)

	response = jsonify({
		"result": all['transactions'],
		"sbd_balance": all["sbd_balance"]
	})
	response.headers.add('Access-Control-Allow-Origin', '*')
	return response


def get_all(user_id):
	try:
		acc = Account(user_id)
	except AccountDoesNotExistsException as e:
		raise NotFound('Account {} does not exists in blockchain'.format(user_id))

	user_history = list(acc.get_account_history(-1, 10000))

	posts = {}

	for item in user_history:
		if item['type'] != 'comment':
			continue
		if 'json_metadata' not in item:
			continue

		json_meta = json.loads(item['json_metadata'])

		if 'app' not in json_meta:
			continue
		if not json_meta['app'].startswith('donate.now/'):
			continue

		key = item['permlink']

		if key in posts:
			continue

		if 'body' not in json_meta:
			continue

		if not json_meta['body']:
			continue

		posts[key] = {
			'user_id': user_id,
			'post_id': key,
			'title': item['title'],
			'body': json_meta['body'],
			'timestamp': item['timestamp'],
			'cover_image_url': json_meta['cover_image_url'] if 'cover_image_url' in json_meta else '',
			'transactions': [],
			'amount_sbd': 0,
			'amount_steem': 0,
		}

	transactions = []

	for item in user_history:

		if item['type'] != 'transfer':
			continue

		if 'memo' not in item:
			continue
		memo = item['memo']
		comment = None

		if memo.endswith(')') and memo.rfind('(') != -1:
			comment = memo[0:memo.rfind('(')].strip()

		post_id = None

		for key in posts.keys():
			k = '({})'.format(key)
			if (k in memo):
				print key
				comment = memo.replace(k, '').strip()
				post_id = key
				break

		if not comment:
			continue

		amount_sbd = 0.0
		amount_steem = 0.0
		if item['amount'].endswith('STEEM'):
			amount_steem = float(str(item['amount']).replace('STEEM', ''))
		if item['amount'].endswith('SBD'):
			amount_sbd = float(item['amount'].replace('SBD', ''))

		transaction = None

		if item['from'] == user_id:
			transaction = {
				'amount_sbd': -amount_sbd,
				'amount_steem': -amount_steem,
				'comment': comment,
				'counterparty': item['to'],
				'timestamp': item['timestamp'],
			}

		if item['to'] == user_id:
			transaction = {
				'amount_sbd': amount_sbd,
				'amount_steem': amount_steem,
				'comment': comment,
				'counterparty': item['from'],
				'timestamp': item['timestamp'],
			}

		if not transaction:
			continue

		if post_id in posts:
			posts[post_id]['transactions'].append(transaction)
			posts[post_id]['amount_sbd'] += transaction['amount_sbd']
			posts[post_id]['amount_steem'] += transaction['amount_steem']

		transactions.append(transaction)

	return {
		'posts': posts,
		'transactions': transactions,
		'sbd_balance': acc["sbd_balance"]
	}

if __name__ == '__main__':
	app.run()


# https://steemconnect.com/sign/transfer?from=olegn&to=steemitby&amount=0.01%20SBD&memo=test%20commint%20(69d6ac64-ad6d-4492-83b8-4dd0233ef264)

# https://barcode.tec-it.com/barcode.ashx?code=QRCode&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0&eclevel=L&data=fgjhdsg%20kjfhgd%20kjhsfgd%20kjs

