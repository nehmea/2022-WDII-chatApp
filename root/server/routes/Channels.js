const express = require("express");
const router = express.Router();
const { channels } = require("../models");
var validator = require("validator");

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
// GET Channel by ChannelID
router.get("/:id", async (request, response, next) => {
  const channelId = parseInt(request.params.id);
  try {
    // channel is null if it is not an int or if it is not found in DB
    const channel = Number.isInteger(channelId) ? await channels.findByPk(channelId) : null;
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
router.post("/new", async (request, response, next) => {
  const channel = request.body;
  try {
    // Creates a default title if there is none
    if (!channel.title) {
      console.log("No channel title");
      channel.title = 'New conversation'
    }
    await channels.create({ ...channel, title: channel.title })
    return response.status(201).send({
      message: `Channel created successfully`,
    })
  } catch {
    response.status(400).send({
      message: "An error occured",
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
      await channels.update(
        { title: newTitle },
        { where: { id: channelId } }
      )
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
      response.status(400).send({ message: 'Channel not found' });
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



module.exports = router;
