const express = require("express");
const router = express.Router();
const { Channels } = require("../models");
var validator = require("validator");

//const Op = require("sequelize").Op;

// ------------------------------------------
// All routes use '/channels' prefix

// ----------------------------------------
// Get All Channels
router.get("/", async (request, response) => {
  const listOfChannels = await Channels.findAll();
  response.json(listOfChannels);
});

// --------------------------------------------
// post a new channel
router.post("/new", async (request, response) => {
  const channel = request.body;

  if (validator.isEmpty(channel.title)) {
    console.log("No channel title");
    channel.title = 'new conversation'
  }
  await Channels.create({ ownerId: channel.ownerId, title: channel.title })
  return response.status(201).send({
    message: `Channel created successfully`,
  })

});





module.exports = router;
