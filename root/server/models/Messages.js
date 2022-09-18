module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define("Messages", {
    body: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      validate : {
        notEmpty: true,
        len: [1,2000],
      }
    },
  });

  Messages.associate = (models) => {
    Messages.belongsTo(models.Users, {
      onDelete: "SET NULL",
    });
    Messages.belongsTo(models.Channels, {
      onDelete: "SET NULL",
    });
  };

  sequelize.sync({ update: true });
  return Messages;
};

