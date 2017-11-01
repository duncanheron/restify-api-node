let mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
let mongoDbName = process.env.MONGODB_NAME || 'api';
let appUrl = process.env.BASE_URL|| 'http://localhost';
let appPort = process.env.PORT|| 3000;
let appEnv = process.env.NODE_ENV || 'development';

module.exports = {
	name: 'API',
	env: appEnv,
	port: appPort,
	base_url: appUrl+':'+appPort,
	db: {
		uri: mongoUrl + '/' + mongoDbName,
	},
};