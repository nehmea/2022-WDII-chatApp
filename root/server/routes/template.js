const express = require("express");
const router = express.Router();
const { Auctions } = require("../models");
var validator = require("validator");

const Op = require("sequelize").Op;

// --------------------------------------------
// post a new auction
router.post("/new", async (request, response) => {
  const auction = request.body;

  if (!validator.isEmail(auction.sellerEmail)) {
    console.log("invalid email");
    response.status(400).send({
      message: "Please provide a valid email address.",
    });
  } else {
    await Auctions.create(auction).then(
      response.status(201).send({
        message: `A new Auction has been successfully submitted`,
      })
    );
  }
});

// ----------------------------------------
// Get All Auction
router.get("/", async (request, response) => {
  const listOfAuctions = await Auctions.findAll();
  response.json(listOfAuctions);
});

// ----------------------------------------
// Get All Auctions with specific title content
router.post("/search", async (request, response) => {
  searchString = request.body.searchString;
  const listOfAuctions = await Auctions.findAll({
    where: {
      [Op.or]: [
        {
          itemName: {
            [Op.like]: `%${searchString}%`,
          },
        },
        {
          itemDescription: {
            [Op.like]: `%${searchString}%`,
          },
        },
      ],
    },
  });
  response.json(listOfAuctions);
});

// ------------------------------------------
// Get an auction by ID
router.get("/auction/:id", async (request, response) => {
  const id = parseInt(request.params.id);
  if (Number.isInteger(id)) {
    const auction = await Auctions.findByPk(id);
    response.status(200).json(auction);
  } else {
    response.status(400).send({
      message: "invalid input id",
    });
  }
});

// -----------------------------------------
// Delete an auction by ID
router.delete("/auction/:id", async (request, response) => {
  const id = parseInt(request.params.id);
  if (Number.isInteger(id)) {
    const count = await Auctions.destroy({ where: { id: id } });
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

// -----------------------------------------
// Patch an auction by ID
router.patch("/auction/:id", async (request, response) => {
  const idToUpdate = request.params.id;
  const newEmail = request.body.lastBidderEmail;
  const newPrice = parseFloat(request.body.lastBidPrice);

  var oldPrice = await Auctions.findByPk(idToUpdate).lastBidPrice;
  var oldPrice = parseFloat(oldPrice);

  console.log(oldPrice, typeof oldPrice);
  console.log(newPrice, typeof newPrice);

  if (!validator.isEmail(newEmail)) {
    response.status(400).send({
      message: "Please provide a valid email address.",
    });
  } else if (newPrice <= oldPrice + 1) {
    response.status(400).send({
      message: `New bid should be higher than $${oldPrice + 1}`,
    });
  } else {
    await Auctions.update(
      {
        lastBidPrice: newPrice,
        lastBidderEmail: newEmail,
      },
      {
        where: {
          id: idToUpdate,
        },
      }
    ).then((result) => {
      response.status(202).send({
        message: `Your bid has been successfully submitted`,
      });
    });
  }
  // console.log("bid updated, fetching new record..");
  // const auction = await Auctions.findByPk(idToUpdate);
  // console.log("new record fetched");
});

module.exports = router;
