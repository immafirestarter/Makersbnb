module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define('Listing', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Listing.belongsTo(models.User, {
          foreignKey: 'content',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return Listing;
};
