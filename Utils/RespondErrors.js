const errors = require('restify-errors');

module.exports = {
	invalidContentError: (message = 'Invalid Content') => {
		console.error('Invalid Content');
		return new errors.InvalidContentError(message);
	},
	notFoundError: (message = 'Resource not found') => {
		console.error('Resource not found');
		return new errors.ResourceNotFoundError(message);
	},
	defaultError: (message = 'Unknown error') => {
		console.error('I am a little teapot');
		return new errors.ImATeapotError(message);
	}
};