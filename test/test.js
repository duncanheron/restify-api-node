process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let supertest = require('supertest');
const config = require('../config');
let api = supertest('http://localhost:3030');
const restify = require('restify');
let s = require('../startServer');
const Drawing = require('../models/drawing');

chai.use(chaiHttp);

describe('Drawings', () => {

	const server = restify.createServer({
		name: config.name,
		version: config.version,
	});

	before(() => {
		s.startServer(server);
		let data = {
			"name": "sausage",
			"artist": "Duncan"
		};
		let drawing = new Drawing(data);
		drawing.save()
			.then((doc) => {
				console.log(doc);
			})
			.catch((err) => {
				console.log(err);
			});
	});
	after(() => {
		s.close(server);
	});

	describe('200 response check', function() {

		it('should get a 200 response 2', function(done) {
			api
				.get('/drawings')
				.expect(200)
				.end((err, res) => {
					console.log(res.body);
					done();
				});
		});

	});

});