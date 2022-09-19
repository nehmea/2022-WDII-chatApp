module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
    },
    bio: {
      type: DataTypes.STRING(1500),
      allowNull: false,
      defaultValue: "Biography",
    },
    avatarUrl: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue:
        "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
    },
    status: {
      type: DataTypes.ENUM("online", "offline", "busy"),
      allowNull: false,
      defaultValue: "busy",
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.messages, {
      foreignKey: "authorId",
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
    Users.belongsToMany(
      models.channels,
      { through: "users_channels" },
      {
        foreignKey: "userId",
      }
    );
    Users.hasMany(models.likes, {
      onDelete: "cascade",
    });
  };

  sequelize.sync({ update: true });
  return Users;
};
