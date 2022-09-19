const express = require("express");
const router = express.Router();
const { users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

// ----------------------------------
// register a new user
router.post("/register", async (request, response) => {
  const new_user = request.body;

  var fetched_user = await users.findOne({
    where: { username: new_user.username },
  });

  if (fetched_user !== null) {
    response.status(400).json({ error: "invalid username input" });
  } else {
    await bcrypt.hash(new_user.password, 10).then((hash) => {
      users
        .create({ ...new_user, password: hash })
        .then((result) => response.status(201).json("Registered Successfully"));
    });
  }
});

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
