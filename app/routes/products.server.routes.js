var product_controller = require('../../app/controllers/products.server.controller');

module.exports = function(app){
	app.route('/api/products/ean/:ean')
	.get(product_controller.getByEAN);
};
