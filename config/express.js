var config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	flash = require('connect-flash');


module.exports = function(){

	var app = express();
	app.use(express.static('./public'));

	if(process.env.NODE_ENV==='development'){
		app.use(morgan('dev'));
	}else if (process.env.NODE_ENV==='production'){
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(session({
		saveUninitialized: true,
		resave:true,
		secret:config.sessionSecret
		}));
	app.set('views','./app/views');
	app.set('view engine','ejs');
	app.use(flash());

	require('../app/routes/offers.server.routes.js')(app);
	require('../app/routes/zanox.server.routes.js')(app);
	require('../app/routes/reviews.server.routes.js')(app);
	require('../app/routes/products.server.routes.js')(app);
		
	return app;
};
