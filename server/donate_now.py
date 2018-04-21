from flask import Flask, jsonify
from flask import redirect
from flask import request
from flask_sqlalchemy import SQLAlchemy

from settings import CLIENT_ID, CLIENT_SECRET, SQLALCHEMY_DATABASE_URI
from steemconnect.client import Client

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI.format(app.root_path)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
FE_URL = 'http://localhost:4200/login/success/{}'


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


@app.route('/get_posts', methods=['POST'])
def get_posts():
	user_id = request.args['user_id']
	return jsonify({'Status': 'TBD'})

@app.route('/get_transfers', methods=['POST'])
def get_transfers():
	user_id = request.args['user_id']



if __name__ == '__main__':
	app.run()
