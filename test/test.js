process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let supertest = require('supertest');
let api = supertest('http://localhost:3000');

chai.use(chaiHttp);

describe('Drawings', () => {

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