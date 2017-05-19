var request = require("request");
var assert = require("assert");
var app = require("../app.js");
var expect  = require('expect.js')
var User = require('../server/models').User
var Browser = require("zombie");
var browser = new Browser();

process.env.NODE_ENV = 'test';

var base_url = "http://localhost:3000/login"
var welcome_url = 'http://localhost:3000/welcome'

describe("Checks login page", function() {

  before(function(done){
    return browser.visit('http://localhost:3000/login',done);
  });

  it('Visits page successfully', function(done) {
    browser.visit(base_url, function() {
      expect(browser.text("h1")).to.equal('LOG IN');
      done();
    });
  });

  describe('Logs In Successfully', function() {

  before(function(done) {
    browser
    .fill('input[name="username"]', 'USERNAME')
    .fill('input[name="password"]', 'password');
    return browser.pressButton('input[value="Log In"]',done);
  });

  it('Redirects on successful login', function(done) {
      browser.assert.url('http://localhost:3000/welcome');
      done();
  });

  it('Can log in successfully', function(done) {
        expect(browser.text("p")).to.equal('HELLO THERE, USERNAME');
        done();
    });
  });
});

  describe('Logs In Unsuccessfully', function() {
    before(function(done){
      return browser.visit('http://localhost:3000/login',done);
    });

    describe('Fails login', function() {
    before(function(done) {
      browser
      .fill('input[name="username"]', 'Ult1mAt3 L337 U53R')
      .fill('input[name="password"]', 'not_a_real_password');
      return browser.pressButton('input[value="Log In"]',done);
    });

  it('Redirects to sign up page if invalid login', function(done) {
      browser.assert.url('http://localhost:3000/signup');
      done();
  });

  it('Does not allow invalid login', function(done) {
      expect(browser.text("h1")).to.equal('Not signed up already? Sign up now!');
      done();
  });
});
});
