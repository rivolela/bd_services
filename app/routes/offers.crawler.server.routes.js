var offers_crawler = require('../../app/controllers/offers.crawler.server.controller');

module.exports = function(app){
	app.route('/api/offers/crawler/page/:page/limit/:limit')
	.get(offers_crawler.list);

	//.post(users.requireLogin,articles.create);

	// app.route('/api/articles/:articleId')
	// 	.get(articles.read)
	// 	.put(users.requireLogin,articles.hasAuthorization,articles.update)
	// 	.delete(users.requireLogin,articles.hasAuthorization,articles.delete);

	// app.param('articleId',articles.articleByID);

};
