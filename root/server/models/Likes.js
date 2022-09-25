module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("likes");

  Likes.associate = (models) => {
    Likes.belongsTo(models.messages);
    Likes.belongsTo(models.users);
  };

  sequelize.sync({ update: true });
  return Likes;
};
