var request = require("request");
var assert = require("assert");
var app = require("../app.js");

var base_url = "http://localhost:3000/"

process.env.NODE_ENV = 'test';


describe("GET /", function(){

  it("returns status code 200", function(done) {
   request.get(base_url, function(error, response){
      assert.equal(200, response.statusCode);
      done();
    });
  });

  it("unknown page returns catchall message", function(done) {
    request.get(base_url, function(error, response, body) {
      assert.equal('{"message":"Welcome to the beginning of nothingness."}', body);
      done();
    });
  });
});
