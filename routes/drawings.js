/**
 * Module Dependencies
 */
const errorResponder = require('../Utils/RespondErrors');

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
				errorResponder.invalidContentError('Expects \'application/json\'')
			);
		}
		let data = req.body || {};
		let drawing = new Drawing(data);
		drawing.save(function(err) {
			if (err) {
				return next(
					errorResponder.defaultError(err.errors.name.message)
				);
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
				return next(
					errorResponder.defaultError(err.errors.name.message)
				);
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
					return next(errorResponder.defaultError(err.errors.name.message));
				}
				if(doc === null) {
					return next(errorResponder.notFoundError());
				}
				res.send(doc);
				next();
			});
		} else {
			return next(errorResponder.notFoundError('The resource you requested could not be found, incorrect id structure.'));
		}
	});

	/**
	 * UPDATE
	 */
	server.put(endpoint+'/:drawing_id', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				errorResponder.invalidContentError('Expects \'application/json\'')
			);
		}

		let data = req.body || {};

		if (!data._id) {
			data = Object.assign({}, data, { _id: req.params.drawing_id });
		}

		Drawing.findOne({ _id: req.params.drawing_id }, function(err, doc) {
			if (err) {
				return next(errorResponder.defaultError(err.errors.name.message));
			} else if (!doc) {
				return next(
					errorResponder.notFoundError('The resource you requested could not be found.')
				);
			}

			Drawing.update({ _id: data._id }, data, function(err) {
				if (err) {
					return next(errorResponder.defaultError(err.errors.name.message));
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
				return next(errorResponder.defaultError(err.errors.name.message));
			}
			res.send(204);
			next();
		});
	});

};