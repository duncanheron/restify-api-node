let mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
let appUrl = process.env.BASE_URL|| 'http://localhost';
let appEnv = process.env.NODE_ENV || 'development';
const envConfig = require('config');
const dbName = envConfig.get('database.name');
const appPort2 = envConfig.get('app.port');
let mongoDbName = dbName || 'api';
let appPort = appPort2 || 3000;

console.log('mongo', mongoDbName);
module.exports = {
	name: 'API',
	env: appEnv,
	port: appPort,
	base_url: appUrl+':'+appPort,
	db: {
		uri: mongoUrl + '/' + mongoDbName,
	},
};