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
const server = restify.createServer({
	name: config.name,
	version: config.version,
});

describe('Drawings', () => {

	before((done) => {
		s.startServer(server);

		let data = {
			"name": "sausage",
			"artist": "army"
		};
		let drawing = new Drawing(data);
		drawing.save()
			.then((doc) => {
				console.log('saved');
				done();
			})
			.catch((err) => {
				console.log(err);
				done();
			});
	});

	describe('200 response check', function(done) {

		it('should get a 200 response', function(done) {
			api
				.get('/drawings')
				.expect(200)
				.end((err, res) => {
					// console.log(res.body);
					console.log(res.body.length);
					done();
				});
		});
	});

	after(() => {
		s.close(server);
	});

});