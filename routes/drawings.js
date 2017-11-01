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
				new errors.InvalidContentError('Expects \'application/json\'')
			);
		}

		let data = req.body || {};

		let drawing = new Drawing(data);
		drawing.save(function(err) {
			if (err) {
				console.error(err);
				return next(new errors.InternalError(err.message));
				next();
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
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			res.send(docs);
			next();
		});
	});

	/**
	 * GET
	 */
	server.get(endpoint+'/:drawing_id', (req, res, next) => {
		Drawing.findOne({ _id: req.params.drawing_id }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			res.send(doc);
			next();
		});
	});

	/**
	 * UPDATE
	 */
	server.put(endpoint+'/:drawing_id', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'")
			);
		}

		let data = req.body || {};

		if (!data._id) {
			data = Object.assign({}, data, { _id: req.params.drawing_id });
		}

		Drawing.findOne({ _id: req.params.drawing_id }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			} else if (!doc) {
				return next(
					new errors.ResourceNotFoundError(
						'The resource you requested could not be found.'
					)
				);
			}

			Drawing.update({ _id: data._id }, data, function(err) {
				if (err) {
					console.error(err);
					return next(
						new errors.InvalidContentError(err.errors.name.message)
					);
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
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			res.send(204);
			next();
		});
	});
};