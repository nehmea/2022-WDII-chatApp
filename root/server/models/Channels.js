module.exports = (sequelize, DataTypes) => {
  const Channels = sequelize.define("channels", {
    title: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Channels.associate = (models) => {
    Channels.hasMany(models.messages, {
      foreignKey: "channelId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Channels.belongsToMany(
      models.users,
      { through: "users_channels" },
      {
        foreignKey: "channelId",
      }
    );
    Channels.addHook(
      "afterCreate",
      "UsersChannelsTrigger",
      (channel, options) => {
        models.users_channels.create({
          channelId: channel.id,
          userId: channel.ownerId,
        });
      }
    );
  };

  sequelize.sync({ update: true });
  return Channels;
};
