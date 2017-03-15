var product_controller = require('../../app/controllers/products.server.controller');

module.exports = function(app){
	app.route('/api/products/ean/:ean')
	.get(product_controller.getByEAN);

	app.route('/api/products/nameurl/:nameurl')
	.get(product_controller.getByNameURL);

	app.route('/api/products/nameurl/:nameurl/page/:page/')
	.get(product_controller.getByNameURL);	
};
