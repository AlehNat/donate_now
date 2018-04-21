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
	user = User.query.filter_by(user_id=user_id).first()
	if not user:
		raise Unauthorized('Not authorized with steemconnect')
	client = Client(access_token=user.steem_token)
	permlink = title.replace(' ', '-').replace('_', '-').encode('ascii', 'ignore')
	if not permlink or len(permlink) < 4:
		permlink = str(uuid4())
	comment = Comment(
		user.user_id,
		permlink,
		"Make donations/tipping easy <a href=\"http://donatenow.io\">donatenow!</a>",
		title=title,
		json_metadata={"app": app_name, "body": body},
	)
	r = client.broadcast([comment.to_operation_structure()])
	if 'error_description' in r and r['error_description']:
		return r['error_description']
	return 'post created'


@app.route('/get_posts', methods=['POST'])
def get_posts():
	user_id = request.args['user_id']
	return jsonify({'Status': 'TBD'})


@app.route('/get_transfers', methods=['POST'])
def get_transfers():
	data_dict = json.loads(request.data)
	user_id = data_dict['user_id']

	acc = Account(user_id)
	hist = acc.get_account_history(-1, 10000, filter_by='transfer')
	listHistory = list(hist)

	total_send_sbd = 0.0
	total_receive_sbd = 0.0
	total_send_steem = 0.0
	total_receive_steem = 0.0
	transaction_send = []
	transaction_receive = []

	for item in listHistory:
		amount_sbd = 0.0
		amount_steem = 0.0

		if item['amount'].endswith('STEEM'):
			amount_steem = float(item['amount'].replace('STEEM', ''))

		if item['amount'].endswith('SBD'):
			amount_sbd = float(item['amount'].replace('SBD', ''))

		transaction = {
			'amount_sbd': amount_sbd,
			'amount_steem': amount_steem,
			'timestamp': item['timestamp'],
			'memo': item['memo']
		}

		if item['from'] == user_id:
			total_send_sbd += amount_sbd
			total_send_steem += amount_steem
			transaction_send.append(transaction)

		if item['to'] == user_id:
			total_receive_sbd += amount_sbd
			total_receive_steem += amount_steem
			transaction_receive.append(transaction)

	result = {
		'total_send_sbd': total_send_sbd,
		'total_send_steem': total_send_steem,
		'total_receive_sbd': total_receive_sbd,
		'total_receive_steem': total_receive_steem,
		'transaction_send': transaction_send,
		'transaction_receive': transaction_receive
	}
	return jsonify(result)


if __name__ == '__main__':
	app.run()
