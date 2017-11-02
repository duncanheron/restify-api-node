const config = require('./config');
const mongoose = require('mongoose');
/**
 * Start Server, Connect to DB & Require Routes
 */
module.exports = {
	startServer:  (server) => {
		server.listen(config.port, () => {
			// establish connection to mongodb
			mongoose.Promise = global.Promise;
			mongoose.connect(config.db.uri, {useMongoClient: true});

			const db = mongoose.connection;

			db.on('error', err => {
				console.error(err);
				process.exit(1);
			});

			db.once('open', () => {
				require('./routes/drawings')(server);
				console.log(`Server is listening on port ${config.port}`);
			});
		});
	},
	close: (server) => {
		server.close(() => {
			console.log('Deleting test database');
			mongoose.connection.db.dropDatabase('test');
			console.log('closing down');
			mongoose.connection.close();
			process.exit();
		});
	}
};