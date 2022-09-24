module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define("messages", {
    body: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 2000],
      },
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
    Messages.belongsTo(models.users, {
      foreignKey: "authorId",
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
    Messages.belongsTo(models.channels, {
      foreignKey: "channelId",
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
  };

  sequelize.sync({ update: true });
  return Messages;
};
