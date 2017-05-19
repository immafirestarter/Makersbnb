var request = require("request");
var assert = require("assert");
var app = require("../app.js");
var expect  = require('expect.js');
var User = require('../server/models').User
var Browser = require("zombie");
var browser = new Browser();

process.env.NODE_ENV = 'test';

var base_url = "http://localhost:3000/signup"
var welcome_url = 'http://localhost:3000/welcome'


describe("GET /signup", function(){
  it("returns status code 200", function(done) {
   request.get(base_url, function(error, response, body){
      assert.equal(200, response.statusCode);
      done();
    });
  });
});

describe("Signup page", function() {

  before(function(done) {
    return browser.visit('http://localhost:3000/signup', done);
  });

  it('Visits signup page', function(done){
      expect(browser.text("h1")).to.equal('Not signed up already? Sign up now!');
      done();
  });

  describe("Signing up", function() {

    before(function(done) {
      browser
      .fill('input[name="name"]', 'BigAdmin')
      .fill('input[name="username"]', 'admin')
      .fill('input[name="email"]', 'admin@bigadmin.com')
      .fill('input[name="password"]', 'password');
      return browser.pressButton('input[value="Submit"]', done);
    });

  it('Redirects when signing up a new user', function(done){
      browser.assert.url('http://localhost:3000/welcome');
      done();
    });

    it('Displays user name', function(done){
      expect(browser.text("p")).to.equal('HELLO THERE, admin');
      done();
    });
  });
});
