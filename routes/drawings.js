/**
 * Module Dependencies
 */
const errors = require('restify-errors');

/**
 * Model Schema
 */
const Drawing = require('../models/drawing');
const endpoint = '/drawings';

module.exports = function(server) {

	/**
	 * POST
	 */
	server.post(endpoint, (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				getInvalidContentErrorWithMessage('Expects \'application/json\'')
			);
		}

		let data = req.body || {};

		let drawing = new Drawing(data);
		drawing.save(function(err) {
			if (err) {
				return respondError(err, next);
			}

			res.send(201);
			next();
		});
	});

	/**
	 * LIST
	 */
	server.get(endpoint, (req, res, next) => {
		Drawing.apiQuery(req.params, function(err, docs) {
			if (err) {
				return respondError(err, next);
			}

			res.send(docs);
			next();
		});
	});

	/**
	 * GET BY ID
	 */
	server.get(endpoint+'/:drawing_id', (req, res, next) => {

		let id = req.params.drawing_id;
		if (id.match(/^[0-9a-fA-F]{24}$/)) {
			Drawing.findOne({_id: id}, function (err, doc) {
				if (err) {
					return respondError(err, next);
				}

				res.send(doc);
				next();
			});
		} else {
			return next(getResourceNotFoundErrorWithMessage('The resource you requested could not be found.'));
		}
	});

	/**
	 * UPDATE
	 */
	server.put(endpoint+'/:drawing_id', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				getInvalidContentErrorWithMessage('Expects \'application/json\'')
			);
		}

		let data = req.body || {};

		if (!data._id) {
			data = Object.assign({}, data, { _id: req.params.drawing_id });
		}

		Drawing.findOne({ _id: req.params.drawing_id }, function(err, doc) {
			if (err) {
				return respondError(err, next);
			} else if (!doc) {
				return next(
					getResourceNotFoundErrorWithMessage('The resource you requested could not be found.')
				);
			}

			Drawing.update({ _id: data._id }, data, function(err) {
				if (err) {
					return respondError(err, next);
				}

				res.send(200, data);
				next();
			});
		});
	});

	/**
	 * DELETE
	 */
	server.del(endpoint+'/:drawing_id', (req, res, next) => {
		Drawing.remove({ _id: req.params.drawing_id }, function(err) {
			if (err) {
				return respondError(err, next);
			}

			res.send(204);
			next();
		});
	});

	let getResourceNotFoundErrorWithMessage = function (message) {
		console.error('Resource not found');
		return new errors.ResourceNotFoundError(message);
	};

	let getInvalidContentErrorWithMessage = function (message) {
		console.error('Invalid Content');
		return new errors.InvalidContentError(message);
	};

	let respondError = function (err, next) {
		console.error(err);
		return next(
			getInvalidContentErrorWithMessage(err.errors.name.message)
		);
	};
};