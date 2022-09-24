const express = require("express");
const router = express.Router();
const { users, channels, users_channels } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");
var colors = require("colors");

// ----------------------------------------
// GET All users
router.get("/", validateToken, async (request, response) => {
  if (request.user.role !== "admin") {
    response
      .status(401)
      .send({ message: "You are not authorized to view users" });
  } else {
    try {
      const listOfUsers = await users.findAll({
        attributes: { exclude: ["password"] },
      });
      response.status(200).json(listOfUsers);
    } catch (err) {
      response.status(500).send({
        message: "Whoops, An error occured!",
      });
      console.error(`Error while getting all users -`, err.message);
      next(err);
    }
  }
});

// ----------------------------------------
// GET a user by ID
router.get("/userInfo", validateToken, async (request, response) => {
  const userId = request.user.id;
  try {
    const userInfo = await users.findByPk(userId, {
      attributes: { exclude: ["password", "role"] },
    });
    // console.log(userInfo);
    response.status(200).json(userInfo);
  } catch (err) {
    response.status(500).send({
      message: "Whoops, An error occured!",
    });
    console.error(`Error while getting all users -`, err.message);
    next(err);
  }
});

// ----------------------------------------
// GET users of a channel by Channel id
router.get("/channel/:id([0-9]+)", validateToken, async (request, response) => {
  const channelId = parseInt(request.params.id);
  try {
    const listOfChannelUsers = await channels.findOne({
      where: { id: channelId },
      include: [
        {
          model: users,
          attributes: ["id", "username", "avatarUrl", "bio"],
          through: "users_channels",
        },
      ],
    });
    response.status(200).json(listOfChannelUsers.users);
  } catch (err) {
    response.status(500).send({
      message: "Whoops, An error occured!",
    });
    console.error(`Error while getting all users -`, err.message);
  }
});

// ----------------------------------
// register a new user
router.post("/register", async (request, response) => {
  const new_user = request.body;

  var fetched_user = await users.findOne({
    where: { username: new_user.username },
  });

  if (fetched_user !== null) {
    response.status(400).json({ error: "Invalid username input" });
  } else {
    await bcrypt.hash(new_user.password, 10).then((hash) => {
      users
        .create({ ...new_user, password: hash })
        .then((result) => response.status(201).json("Registered Successfully"));
    });
  }
});

// ----------------------------------
// edit user profile
router.patch("/profile/edit", validateToken, async (request, response) => {
  const userId = request.user.id;
  const userInfo = request.body;

  var fetched_user = await users.findByPk(userId);

  const match =
    fetched_user !== null
      ? await bcrypt.compare(userInfo.password, fetched_user.password)
      : false;

  if (fetched_user === null || !match) {
    response
      .status(401)
      .send({ message: "You are not authorized to perform this action" });
  } else {
    await users
      .update(
        {
          avatarUrl: userInfo.avatarUrl,
          bio: userInfo.bio,
        },
        {
          where: {
            id: userId,
          },
        }
      )
      .then((result) => {
        response.status(202).send({ message: `Profile successfully updated` });
      })
      .catch((error) => {
        response.status(500).send({
          message: `Whoops, something went worng`,
        });
      });
  }
});

// ----------------------------------
// edit user password
router.patch("/password/edit", validateToken, async (request, response) => {
  const userId = request.user.id;
  const { oldPassword, newPassword } = request.body;

  var fetched_user = await users.findByPk(userId);

  const match =
    fetched_user !== null
      ? await bcrypt.compare(oldPassword, fetched_user.password)
      : false;

  if (fetched_user === null) {
    response
      .status(401)
      .send({ message: "You are not authorized to perform this action" });
  } else if (!match) {
    response.status(401).send({ message: "Old Password does not match" });
  } else {
    await bcrypt
      .hash(newPassword, 10)
      .then((hash) => {
        users
          .update({ password: hash }, { where: { id: userId } })
          .then((result) => response.status(201).json("Password Updated"));
      })
      .catch((error) => {
        response.status(500).send({
          message: `Whoops, something went worng`,
        });
      });
  }
});

// --------------------------------------------
// DELETE a user
router.delete(
  "/delete/user/:id([0-9]+)",
  validateToken,
  async (request, response, next) => {
    if (request.user.role !== "admin") {
      response
        .status(401)
        .send({ message: "You are unauthorized to delete users" });
    }
    const userId = parseInt(request.params.id);
    try {
      const count = await users.destroy({ where: { id: userId } });
      if (count == 0) {
        response.status(400).send({ message: "User not found" });
      } else if (count > 0) {
        response.status(200).send({ message: `User successfully deleted.` });
      }
    } catch (err) {
      response.status(500).send({
        message: "Channel not found",
      });
      console.error(`Error while deleting a channel - ${err.message}`.red);
      next(err);
    }
  }
);

// ----------------------------------
//  user login and authentication
router.post("/login", async (request, response) => {
  const new_user = request.body;

  var fetched_user = await users.findOne({
    where: { username: new_user.username },
  });
  const match =
    fetched_user !== null
      ? await bcrypt.compare(new_user.password, fetched_user.password)
      : false;
  if (fetched_user === null || !match) {
    response.status(400).json({ error: "Wrong username and/or Password" });
  } else {
    const accessToken = sign(
      {
        username: fetched_user.username,
        id: fetched_user.id,
        role: fetched_user.role,
      },
      "ljskffgoSAFKBISDHF"
    );
    response.status(200).json({
      token: accessToken,
      username: fetched_user.username,
      id: fetched_user.id,
      role: fetched_user.role,
    });
  }
});

// ----------------------------------
//  get user authentication status
router.get("/", validateToken, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
