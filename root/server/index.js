const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");

const PORT = "3001";

app.use(express.json());
app.use(cors());

// Routers
// > Messages
const messagesRouter = require("./routes/Messages");
app.use("/messages", messagesRouter);
// > Channels
const channelsRouter = require("./routes/Channels");
app.use("/channels", channelsRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Server Running on port", PORT);
  });
});
