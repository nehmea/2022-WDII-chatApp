const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");

const PORT = "3001";

app.use(express.json());
app.use(cors());

// Routers
/* const nameRouter = require("./routes/Name");
 app.use("/name", nameRouter); */
// users
const usersRouter = require("./routes/Users");
app.use("/users", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Server Running on port", PORT);
  });
});
