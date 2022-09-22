const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const db = require("./models");
const cors = require("cors");

const PORT = "3001";

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PATCH", "DELETE"],
    }
});

io.on("connection", (socket) => {
    console.log("User Connected: ", socket.id);

    socket.on("join_room", (data) => {
        socket.join(data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected: ", socket.id);
    });
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

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

//https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("\x1b[32m%s\x1b[0m", `Server Running on port ${PORT}`); //BgGreen = "\x1b[42m"
  });
});
