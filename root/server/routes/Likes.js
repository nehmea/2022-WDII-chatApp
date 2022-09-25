const express = require("express");
const router = express.Router();
const { messages, users, likes } = require("../models");
var validator = require("validator");
const Sequelize = require("sequelize");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.post("/", async (request, response) => {
  const { messageId } = request.body;
  const { userId } = request.user.id;


  const found = await likes.findOne({
    where: { messageId: messageId, userId: userId },
  });

  if (!found) {
    await likes.create({ messageId: messageId, userId: userId });
    response.json(1);
  } else {
    await likes.destroy({ where: { messageId: messageId, userId: userId } });
    response.json(-1);
  }
  });

module.exports = router;