const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const db = require("./models");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const PORT = "3001";

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

// Socket.io

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    // methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected: ", socket.id);

  socket.on("setup", (userData) => {
    socket.join(userData.id);
    console.log(userData);
    socket.emit("connected");
  });

  socket.on("join_channel", (channelId) => {
    socket.join(channelId);
    console.log("user joined Channel: ", channelId);
  });

  socket.on("send_message", (messages) => {
    socket.broadcast.emit("receive_message", messages);
  });

  socket.on("typing", (activeChannel) => {
    socket.broadcast.emit("typing");
  });
  socket.on("stopTyping", (activeChannel) => {
    socket.broadcast.emit("stopTyping");
  });
  //   socket.on("disconnect", () => {
  //     console.log("User Disconnected: ", socket.id);
  //   });
});

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
// > Likes
const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);

// --------------------- Deployment -------------------------------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (request, response) => {
    response.send("API is Running Successfully");
  });
}

//  ---------------------------------------------------------------

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

//https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
db.sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log("\x1b[32m%s\x1b[0m", `Server Running on port ${PORT}`); //BgGreen = "\x1b[42m"
  });
});
