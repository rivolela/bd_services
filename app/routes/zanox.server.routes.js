var zanox = require('../../app/controllers/zanox.server.controller');

module.exports = function(app){
	app.route('/api/offers/zn/query/:query/page/:page/items/:items')
	.get(zanox.list);

	//.post(users.requireLogin,articles.create);

	// app.route('/api/articles/:articleId')
	// 	.get(articles.read)
	// 	.put(users.requireLogin,articles.hasAuthorization,articles.update)
	// 	.delete(users.requireLogin,articles.hasAuthorization,articles.delete);

	// app.param('articleId',articles.articleByID);

};
