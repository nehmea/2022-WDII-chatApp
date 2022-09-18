const express = require("express");
const router = express.Router();
const { messages } = require("../models");
var validator = require("validator");

//const Op = require("sequelize").Op;

// ------------------------------------------
// All routes use '/messages' prefix

// ------------------------------------------
// Get message by ID
router.get("/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    if (Number.isInteger(id)) {
      const mes = await messages.findByPk(id);
      response.status(200).json(mes);
    } else {
      response.status(400).send({
        message: "invalid input id",
      });
    }
});

// ------------------------------------------
// Get message by authorID
router.get("/byUser/:authorId", async (request, response) => {
    const authorId = parseInt(request.params.authorId);
    if (Number.isInteger(authorId)) {
      const mes = await messages.findAll({ where: { authorId: authorId } });
      response.status(200).json(mes);
    } else {
      response.status(400).send({
        message: "invalid authorId",
      });
    }
});

// ------------------------------------------
// Get message by channelID
router.get("/byChannel/:channelId", async (request, response) => {
    const channelId = parseInt(request.params.authorId);
    if (Number.isInteger(channelId)) {
      const mes = await messages.findAll({ where: { channelId: channelId } });
      response.status(200).json(mes);
    } else {
      response.status(400).send({
        message: "invalid channelId",
      });
    }
});

// --------------------------------------------
// Post a new message
router.post("/", async (request, response) => {
    const mes = request.body;
  
    if (validator.isEmpty(mes.body)) {
      console.log("Empty message");
      response.status(400).send({
        message: "Please compose a message",
      });
    } else {
      await messages.create(mes).then(
        response.status(201).send({
          message: `A new Message has been successfully posted`,
        })
      );
    }
});

// -----------------------------------------
// Patch a message by ID
router.patch("/:id", async (request, response) => {
    const idToUpdate = request.params.id;
    const newBody = request.body.body;
    const NewIsDeleted = parseInt(request.body.isDeleted);
  
    if (validator.isEmpty(newBody)) {
      response.status(400).send({
        message: "Message cannot be empty",
      });
    } else {
      await messages.update(
        {
          body: newBody,
          isDeleted: NewIsDeleted,
        },
        {
          where: {
            id: idToUpdate,
          },
        }
      ).then((result) => {
        response.status(202).send({
          message: `Your message has been successfully edited`,
        });
      });
    }
});

// -----------------------------------------
// Delete a message by ID
router.delete("/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    if (Number.isInteger(id)) {
      const count = await messages.destroy({ where: { id: id } });
      if (count == 0) {
        response.status(400).send(`There is no record with id=${id}`);
      } else if (count > 0) {
        response.status(200).send(`${count} row(s) deleted`);
      }
    } else {
      response.status(400).send({
        message: "invalid input id",
      });
    }
});

module.exports = router;