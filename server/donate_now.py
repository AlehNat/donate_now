from flask import Flask, jsonify
from flask import json
from flask import redirect
from flask import request
from flask_sqlalchemy import SQLAlchemy
from steem.account import Account
from werkzeug.exceptions import Unauthorized

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
	return 'post created'


@app.route('/get_posts', methods=['POST'])
def get_posts():
	user_id = request.args['user_id']
	return jsonify({'Status': 'TBD'})


@app.route('/transfers')
def get_transfers():
	user_id = request.args['user_id']
	acc = Account(user_id)
userHistory = list(acc.get_account_history(-1, 10000))

	posts = {}

	for item in userHistory:
		if item['type'] != 'comment':
			continue
		json_meta = json.loads(item['json_metadata'])
		if not json_meta['app'].startswith('donate.now/'):
			continue

		key = item['permlink']

		if posts.has_key(key):
			continue

		posts[key] = {
			'comments_count': 0,
			'total_send_sbd': 0.0,
			'total_send_steem': 0.0,
			'total_receive_sbd': 0.0,
			'total_receive_steem': 0.0,
			'transaction_send': [],
			'transaction_receive': []
		}

		if json_meta.has_key('body'):
			posts[key]['body'] = json_meta['body']
		else:
			posts[key]['body'] = ''

	transactions = []

	for item in userHistory:

		if item['type'] != 'transfer':
			continue

		memo = str(item['memo'])
		comment = None

		if memo.endswith(')') and memo.rfind('(') != -1:
			comment = memo[0:memo.rfind('(')]

		# for key in posts.keys():
		#     k = '({})'.format(key)
		#     if (k in memo):
		#         print key
		#         comment = memo.replace(k, '')
		#         break

		if not comment:
			continue

		amount_sbd = 0.0
		amount_steem = 0.0
		if str(item['amount']).endswith('STEEM'):
			amount_steem = float(str(item['amount']).replace('STEEM', ''))
		if str(item['amount']).endswith('SBD'):
			amount_sbd = float(str(item['amount']).replace('SBD', ''))

		if item['from'] == user_id:
			transactions.append({
				'amount_sbd': -amount_sbd,
				'amount_steem': -amount_steem,
				'comment': comment,
				'counterparty': item['to'],
				'timestamp': item['timestamp'],
			})

		if item['to'] == user_id:
			transactions.append({
				'amount_sbd': amount_sbd,
				'amount_steem': amount_steem,
				'comment': comment,
				'counterparty': item['from'],
				'timestamp': item['timestamp'],
			})

	return jsonify(transactions)


if __name__ == '__main__':
	app.run()


# https://steemconnect.com/sign/transfer?from=olegn&to=steemitby&amount=0.01%20SBD&memo=test%20commint%20(69d6ac64-ad6d-4492-83b8-4dd0233ef264)