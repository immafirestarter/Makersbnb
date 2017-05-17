process.env.NODE_ENV = 'test';
// var app = require('express');
var http = require('http');
// use zombie.js as headless browser
var Browser = require('zombie');
var app = require('../app.js');
var expect = require('expect');

describe('contact page', function() {
  before(function() {
    // this.server = http.createServer(app).listen(8000);
    // initialize the browser using the same port as the test application
    this.browser = new Browser({ site: 'http://localhost:8000' });
  });


  before(function(done) {
    this.browser.visit('/home', done);
  });

  it('should show contact a form');
  expect().to.equal(0);
  it('should refuse empty submissions');

});
