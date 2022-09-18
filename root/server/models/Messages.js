module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define("messages", {
    body: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      validate : {
        notEmpty: true,
        len: [1,2000],
      }
    },
    isDeleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
  });

  Messages.associate = (models) => {
    //Parent
    Messages.hasMany(models.likes, {
      onDelete: "cascade",
    });
    //Child
    Messages.belongsTo(models.users);
    Messages.belongsTo(models.channels);
  };

  sequelize.sync({ update: true });
  return Messages;
};
