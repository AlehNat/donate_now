from steem.account import Account

def get_transfers(user_id):
	acc = Account(user_id)
	for c in (gg for gg in acc.get_account_history(-1, 1000, filter_by=['transfer'])):
		print u'{}: {}->{}'.format(c[u'body'], c[u'author'], c[u'parent_author'])

