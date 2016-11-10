var offers_crawler = require('../../app/controllers/offers.server.controller');

module.exports = function(app){
	app.route('/api/offers/bd/page/:page/limit/:limit')
	.get(offers_crawler.list);

	app.route('/api/offers/bd/ean/:ean/page/:page/limit/:limit')
	.get(offers_crawler.listByEan);

	app.route('/api/offers/bd/category/:category/page/:page/limit/:limit')
	.get(offers_crawler.listByCategory);

	//.post(users.requireLogin,articles.create);

	// app.route('/api/articles/:articleId')
	// 	.get(articles.read)
	// 	.put(users.requireLogin,articles.hasAuthorization,articles.update)
	// 	.delete(users.requireLogin,articles.hasAuthorization,articles.delete);

	// app.param('articleId',articles.articleByID);

};
