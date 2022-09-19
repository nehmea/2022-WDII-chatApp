const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");

const PORT = "3001";
// const io = require("socket.io")(PORT, {
//     cors: {
//         origin: ["http://localhost:3000"],
//     },
// });

app.use(express.json());
app.use(cors());

// Routers
// > users
const usersRouter = require("./routes/Users");
app.use("/users", usersRouter);
// > Messages
const messagesRouter = require("./routes/Messages");
app.use("/messages", messagesRouter);
// > Channels
const channelsRouter = require("./routes/Channels");
app.use("/channels", channelsRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("Server Running on port", PORT);
  });
});

// Socket.io
// io.on('connection', socket => {
//     console.log(socket.id);
//     socket.on('custom-event', (number, string, obj) => {
//         console.log(number, string, obj)
//     })
// });
