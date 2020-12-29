var expect  = require("chai").expect;
var request = require("request");
const axios = require('axios');
process.env.NODE_ENV = 'test';
const app = require('../server.js');


var expect  = require("chai").expect;
var request = require("request");

describe("GET WEATHER API", function() {

  describe("Get all cities", function() {
    var url = "http://localhost:5000/api/weather";

    it("returns status 200", function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("Get all cities should fail", function() {
    var url = "http://localhost:5000/api/";

    it("returns status 404", function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });
});
