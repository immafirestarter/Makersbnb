'use strict';

const bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      generateHash: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSalt(10), null)
      },
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.local.password);
      }
    }
  });
  return User;
};
