const express = require("express");
const router = express.Router();
const { messages, likes } = require("../models");
const { users } = require("../models");
var validator = require("validator");
const { validateToken } = require("../middlewares/AuthMiddleware");

//const Op = require("sequelize").Op;

// ------------------------------------------
// All routes use '/messages' prefix

// ------------------------------------------
// Get message by ID
router.get("/:id", async (request, response) => {
  const id = parseInt(request.params.id);
  try {
    const mes = Number.isInteger(id) ? await messages.findByPk(id) : null;
    if (mes !== null) {
      response.status(200).json(mes);
    } else {
      response.status(400).send({
        message: "message not found",
      });
    }
  } catch (err) {
    response.status(400).send({
      message: "An error occured",
    });
    console.error(`Error while getting a message by ID -`, err.message);
    next(err);
  }
});

// ------------------------------------------
// Get message by authorID
router.get("/byUser/:authorId", async (request, response) => {
  const authorId = parseInt(request.params.authorId);
  try {
    if (Number.isInteger(authorId)) {
      const mes = await messages.findAll({ where: { authorId: authorId } });
      response.status(200).json(mes);
    } else {
      response.status(400).send({
        message: "invalid authorId",
      });
    }
  } catch (err) {
    response.status(400).send({
      message: "An error occured",
    });
    console.error(`Error while getting a message by authorID -`, err.message);
    next(err);
  }
});

// ------------------------------------------
// Get messages by channelID
router.get("/byChannel/:channelId", validateToken, async (request, response) => {
  const channelId = parseInt(request.params.channelId);
  try {
    if (Number.isInteger(channelId)) {
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
        ],
      });
      console.log(listOfMessages);
      response.status(200).json(listOfMessages);
    } else {
      response.status(400).send({
        message: "invalid channelId",
      });
    }
  } catch (err) {
    response.status(500).send({
      message: "An error occured",
    });
    console.error(`Error while getting a message by channelID -`, err.message);
  }
});

// --------------------------------------------
// Post a new message
router.post("/", validateToken, async (request, response) => {
  let message = request.body;
  message.authorId = request.user.id;
  // console.log(mes);
  console.log(message);

  if (
    validator.isEmpty(message.body) ||
    !message.channelId ||
    !message.authorId
  ) {
    console.log("Empty message");
    response.status(400).send({
      message: "invalid data passed on send message",
    });
  }

  await messages.create(message);

  await messages
    .findAll({
      where: {
        channelId: message.channelId,
      },
      include: [
        {
          model: users,
        },
        {
          model: likes, 
        },
      ],
    })
    .then((result) => {
      response.status(201).send(result);
    })
    .catch((error) => {
      response.status(500).send({
        message: "WHOOPS, something wrong occurred",
      });
    });
});

// -----------------------------------------
// Patch a message by ID
router.patch("/:id", async (request, response) => {
  const idToUpdate = request.params.id;
  const newBody = request.body.body;
  const newIsDeleted = parseInt(request.body.isDeleted);

  if (validator.isEmpty(newBody)) {
    response.status(400).send({
      message: "message cannot be empty",
    });
  } else {
    await messages
      .update(
        {
          body: newBody,
          isDeleted: newIsDeleted,
        },
        {
          where: {
            id: idToUpdate,
          },
        }
      )
      .then((result) => {
        response.status(202).send({
          message: `Your message has been successfully edited`,
        });
      });
  }
});

// -----------------------------------------
// Delete a message by ID (isDelted)
router.patch(
  "/delete/message/:id([0-9]+)",
  validateToken,
  async (request, response) => {
    const id = parseInt(request.params.id);
    const { isDeleted } = request.body;
    // console.log(isDeleted);
    if (Number.isInteger(id)) {
      try {
        const count = await messages.update(
          { isDeleted: isDeleted },
          { where: { id: id } }
        );
        if (count == 0) {
          response
            .status(400)
            .send({ message: `There is no record for this message` });
        } else if (count > 0) {
          response.status(200).send({ isDeleted: isDeleted });
        }
      } catch (error) {
        response.status(500).send({
          message: "Whoops something went wrong",
        });
      }
    } else {
      response.status(400).send({ message: "invalid input" });
    }
  }
);

module.exports = router;
