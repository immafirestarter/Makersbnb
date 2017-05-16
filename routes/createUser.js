var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* GET DB information and User Creation*/


router.post('/', function(req, res, next) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var dob = req.query.dob;
    var userName = req.body.userName;
    var password = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;
    console.log(firstName, lastName);
    res.redirect('welcome');
});


module.exports = router;
