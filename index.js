const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socketIo = require("socket.io");
const http = require("http");

const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");

const app = express();
const server = http.createServer(app); // Create HTTP server instance

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb connection established"))
  .catch((error) => console.log("MongoDb connection fail: ", error.message));

// Socket.io setup
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Update with your frontend URL
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Example: Send a message to the client when connected
  socket.emit("message", "You are connected");

  // Example: Receive messages from the client
  socket.on("chat message", (msg) => {
    console.log("Message from client:", msg);
    // Handle the message as needed, e.g., save to MongoDB and broadcast to other clients
    io.emit("chat message", msg); // Broadcast the message to all connected clients
  });

  // Example: Disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the chat app API...");
});
