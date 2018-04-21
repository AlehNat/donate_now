from flask import Flask, jsonify
from flask import redirect
from flask import request
from steemconnect.client import Client
from steem import Steem

from settings import CLIENT_ID, CLIENT_SECRET

app = Flask(__name__)

FE_URL = 'http://localhost:4200/login/success/{}'
STEEM_CLIENT = Steem()


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
		"login,vote",
	)
	return redirect(auth_url)


@app.route('/complete/steemconnect/')
def login_complete():
	token = request.args['access_token']
	c = Client(
		access_token=token,
	)
	user_info = c.me()
	return redirect(FE_URL.format(user_info['name']))


@app.route('/get_posts', methods=['POST'])
def get_posts():
	user_id = request.args['user_id']
	return jsonify({'Status': 'TBD'})




if __name__ == '__main__':
	app.run()
