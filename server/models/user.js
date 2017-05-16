module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Listing, {
          foreignKey: 'userId',
          as: 'listings',
        });
      },
    },
  });
  return User;
};
