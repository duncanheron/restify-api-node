require('dotenv').config();

/**
 * Module Dependencies
 */

const config = require('./config');
const restify = require('restify');
const restifyPlugins = require('restify-plugins');
const s = require('./startServer');

/**
 * Initialize Server
 */
const server = restify.createServer({
	name: config.name,
	version: config.version,
});

/**
 * Middleware
 */
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

/**
 * Start Server, Connect to DB & Require Routes
 */
s.startServer(server);
