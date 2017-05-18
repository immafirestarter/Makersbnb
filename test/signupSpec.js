var request = require("request");
var assert = require("assert");
var app = require("../app.js");
var expect  = require('expect.js')
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var Browser = require("zombie");
var browser = new Browser();

chai.use(chaiHttp);

var base_url = "http://localhost:8000/signup"
var welcome_url = 'http://localhost:8000/welcome'


describe("GET /signup", function(){
  it("returns status code 200", function(done) {
   request.get(base_url, function(error, response, body){
      assert.equal(200, response.statusCode);
      done();
    });
  });
});

describe("Signing Up", function() {

  it('Visits signup page', function(done){
    browser.visit(base_url, function () {
      expect(browser.text("h1")).to.equal('Not signed up already? Sign up now!');
      done();
    });
  });


  it('Signs up a new user', function(done){
      browser
      .fill('input[name="name"]', 'BigAdmin')
      .fill('input[name="username"]', 'admin')
      .fill('input[name="email"]', 'admin@bigadmin.com')
      .fill('input[name="password"]', 'password')
      .pressButton('input[value="Submit"]', function(res) {
      });
      browser.assert.url('http://localhost:8000/user/new')
      browser.visit(welcome_url, function () {});
      browser.assert.url('http://localhost:8000/welcome')
      done();
    });
});
