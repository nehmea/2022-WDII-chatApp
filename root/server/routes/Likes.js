const express = require("express");
const router = express.Router();
const { messages, users, likes, channels } = require("../models");
var validator = require("validator");
const Sequelize = require("sequelize");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.post("/", async (request, response) => {
  const { messageId } = request.body;
  const { userId } = request.body;
  const { channelId } = request.body;


  const found = await likes.findOne({
    where: { messageId: messageId, userId: userId },
  });

  if (!found) {
    await likes.create({ messageId: messageId, userId: userId });
  } else {
    await likes.destroy({ where: { messageId: messageId, userId: userId } });
  }

  const listOfMessages = await messages.findAll({
    where: {
      channelId: channelId,
    },
    include: [
      {
        model: users, 
      },
      {
        model: likes, 
      },
      {
        model: channels, 
      },
    ],
  });

  response.json(listOfMessages);
  });

module.exports = router;