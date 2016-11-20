var request = require('supertest');
var app = require('../index.js');
var should = require('should');
// var config = require('../config');

describe('test/test.js', function () {
  it('should / status 200', function (done) {
    request(app).get('/').end(function (err, res) {
      res.status.should.equal(200);
      // res.text.should.containEql(config.description);
      done();
    });
  });

});
