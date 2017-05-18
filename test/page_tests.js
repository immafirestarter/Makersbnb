var request = require("request");
var assert = require("assert");
var app = require("../app.js");

var base_url = "http://localhost:8000/"


describe("GET /", function(){
  it("returns status code 200", function(done) {

    request.get(base_url, function(error, response, body){
      assert.equal(200, response.statusCode);
      done();
    });
  });
  it("/ page returns nothingness", function(done) {
    request.get(base_url, function(error, response, body) {
      //expect(body).toBe("Hello World");
      assert.equal('{"message":"Welcome to the beginning of nothingness."}', body);
      done();
    });
  });

});
