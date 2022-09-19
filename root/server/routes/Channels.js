const express = require("express");
const router = express.Router();
const { channels } = require("../models");
var validator = require("validator");

//const Op = require("sequelize").Op;

// ------------------------------------------
// All routes use '/channels' prefix

// ----------------------------------------
// Get All Channels
router.get("/", async (request, response) => {
  const listOfChannels = await channels.findAll();
  response.json(listOfChannels);
});

// ----------------------------------------
// Get Channel by ChannelID
router.get("/:id", async (request, response) => {
  const channelId = parseInt(request.params.channelId);
  if (Number.isInteger(channelId)) {
    const channel = await channels.findByPk(id);
    response.status(200).json(channel);
  } else {
    response.status(400).send({
      message: "Not found",
    });
  }
});
// --------------------------------------------
// post a new channel
router.post("/new", async (request, response) => {
  const channel = request.body;

  if (validator.isEmpty(channel.title)) {
    console.log("No channel title");
    channel.title = 'new conversation'
  }
  await channels.create({ ownerId: channel.ownerId, title: channel.title })
  return response.status(201).send({
    message: `Channel created successfully`,
  })
});

router.patch("/:id", async (request, response) => {
  const channelId = request.params.id;
  const newTitle = request.body.title;

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
});

router.delete("/:id", async (request, response) => {
  const channelId = parseInt(request.params.id);
  const count = await channels.destroy({ where: { id: channelId } });
  if (count == 0) {
    response.status(400).send({ message: 'Channel not found' });
  } else if (count > 0) {
    response.status(200).send({ message: `Channell successfully deleted.` });
  }
});



module.exports = router;
