module.exports = {

	// Test configuration options
	db:'mongodb://127.0.0.1:27017/bd_test',
	sessionSecret: 'testSessionSecret',
	connectid:'43EEF0445509C7205827',
	viewEngine: 'ejs',

	// Crawler Options 
	// programs ids
	// 12011 : Walmart BR"
	// 13212 : Ricardo Eletro BR
	// 16588 : Lojas Colombo BR
	// 12781 : Ponto Frio
	programs:'12011,13212,16588,12781',

	facebook:{
		clientID:'101029623673783',
		clientSecret:'048b2d74eec461e2647dcce53194fa9b',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback',
	 	profileFields: ['emails', 'displayName','name','photos','gender']
	 },
	 twitter:{
	 	clientID:'mPw8xcOvWQWCTJ01T0kwM5W98',
	 	clientSecret:'k1sIPj161QwQRitpeTV4WBGzOgSOJfSd8Egve859k2JRdgwIp9',
	 	callbackURL: 'http://localhost:3000/oauth/twitter/callback'
	 },
	 google:{
	 	clientID:'416679921997-pod9rv1pq75rfbrt2l38cvc6cq2qscde.apps.googleusercontent.com',
	 	clientSecret:'LRCW9Q90b7Uo_df9F8B5-Fzv',
	 	callbackURL: 'http://localhost:3000/oauth/google/callback'
	 }
};