var reviews = require('../../app/controllers/reviews.server.controller');

module.exports = function(app){
	app.route('/api/reviews/ean/:ean/page/:page/limit/:limit/filter/:filter')
	.get(reviews.list);

	app.route('/api/reviews/ean/:ean/page/:page/limit/:limit/')
	.get(reviews.list);

	app.route('/api/reviews/category/:category/page/:page/limit/:limit')
	.get(reviews.listByCategory);

	app.route('/api/reviews/summary/ean/:ean/')
	.get(reviews.getReviewsSummaryByEan);
};
