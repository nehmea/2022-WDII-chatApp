const express = require("express");
const router = express.Router();
const { users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

// ----------------------------------------
// GET All users
router.get("/", async (request, response) => {
  try {
    const listOfUsers = await users.findAll();
    response.status(200).json(listOfUsers);
  } catch (err) {
    response.status(500).send({
      message: "Whoops, An error occured!",
    });
    console.error(`Error while getting all users -`, err.message);
    next(err);
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
      console.error(`Error while deleting a channel -`, err.message);
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
