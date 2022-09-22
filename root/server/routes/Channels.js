const express = require("express");
const router = express.Router();
const { channels, users_channels } = require("../models");
var validator = require("validator");
const { validateToken } = require("../middlewares/AuthMiddleware");

//const Op = require("sequelize").Op;

// ------------------------------------------
// All routes use '/Channels' prefix

// ----------------------------------------
// GET All Channels
router.get("/", async (request, response) => {
  try {
    const listOfChannels = await channels.findAll();
    response.json(listOfChannels);
  } catch (err) {
    response.status(400).send({
      message: "An error occured",
    });
    console.error(`Error while getting all channels -`, err.message);
    next(err);
  }
});

// ----------------------------------------
// GET All Channels for a user
router.get("/user", validateToken, async (request, response) => {
  const userId = request.user.id;
  try {
    const listOfChannels = await channels.findAll();
    const fetchedJoinedChanned = await users_channels.findAll({
      attributes: ["channelId"],
      where: {
        userId: userId,
      },
    });

    var joinedChannels = [];
    fetchedJoinedChanned.forEach(function (channel) {
      joinedChannels.push(channel.channelId);
    });
    response
      .status(200)
      .json({ listOfChannels: listOfChannels, joinedChannels: joinedChannels });
  } catch (err) {
    response.status(500).send({
      message: "An error occured",
    });
    console.error(`Error while getting all channels -`, err.message);
    next(err);
  }
});

// ----------------------------------------
// GET Channel by ChannelID
router.get("/:id", async (request, response, next) => {
  const channelId = parseInt(request.params.id);
  try {
    // channel is null if it is not an int or if it is not found in DB
    const channel = Number.isInteger(channelId)
      ? await channels.findByPk(channelId)
      : null;
    if (channel !== null) {
      response.status(200).json(channel);
    } else {
      response.status(400).send({
        message: "Channel not found",
      });
    }
  } catch (err) {
    response.status(400).send({
      message: "An error occured",
    });
    console.error(`Error while getting a channel by ID -`, err.message);
    next(err);
  }
});

// --------------------------------------------
// POST a new channel
router.post("/new", validateToken, async (request, response, next) => {
  var channel = request.body;
  // Creates a default title if there is none
  channel.title = !channel.title ? "New conversation" : channel.title;
  channel.ownerId = request.user.id;
  try {
    await channels.create(channel);
    return response.status(201).send({
      message: `Channel created successfully`,
      newChannel: channel,
    });
  } catch (err) {
    response.status(500).send({
      message: "An error occured while creating the channel",
    });
    console.error(`Error while creating a new channel -`, err.message);
    next(err);
  }
});

// --------------------------------------------
// EDIT a channel
router.patch("/:id", async (request, response, next) => {
  const channelId = request.params.id;
  const newTitle = request.body.title;

  try {
    if (validator.isEmpty(newTitle)) {
      response.status(400).send({
        message: "Title cannot be empty",
      });
    } else {
      await channels.update({ title: newTitle }, { where: { id: channelId } });
      response.status(202).send({
        message: `Channel title has been successfully updated`,
      });
    }
  } catch (err) {
    response.status(400).send({
      message: "An error occured",
    });
    console.error(`Error while editing a channel -`, err.message);
    next(err);
  }
});

// --------------------------------------------
// DELETE a channel
router.delete("/:id", async (request, response, next) => {
  const channelId = parseInt(request.params.id);
  try {
    const count = await channels.destroy({ where: { id: channelId } });
    if (count == 0) {
      response.status(400).send({ message: "Channel not found" });
    } else if (count > 0) {
      response.status(200).send({ message: `Channel successfully deleted.` });
    }
  } catch (err) {
    response.status(400).send({
      message: "Channel not found",
    });
    console.error(`Error while deleting a channel -`, err.message);
    next(err);
  }
});

// --------------------------------------------
// user join a channel
router.post("/join", validateToken, async (request, response, next) => {
  const newJoin = {
    channelId: request.body.channelId,
    userId: request.user.id,
  };
  try {
    const [join, created] = await users_channels.findOrCreate({
      where: newJoin,
      defaults: newJoin,
    });
    if (!created) {
      await users_channels.destroy({ where: newJoin });
      response.status(200).json(-1);
    } else {
      return response.status(201).json(1);
    }
  } catch (err) {
    response.status(500).send({
      message: "Whoops, An error occured!",
    });
    console.error("\x1b[33m%s\x1b[0m", err.message);
    next(err);
  }
});

module.exports = router;
