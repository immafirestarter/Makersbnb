var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var email = req.query.email;
  console.log(email);
  res.send(`Your email is ${email}`);
});

module.exports = router;
