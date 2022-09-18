module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define("messages", {
    body: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
  });

  Messages.associate = (models) => {
    Messages.hasMany(models.likes, {
      onDelete: "cascade",
    });
  };

  sequelize.sync({ update: true });
  return Messages;
};
