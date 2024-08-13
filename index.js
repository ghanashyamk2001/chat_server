const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const WebSocket = require("ws"); // Note the capital 'W'

const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");
const { config } = require("dotenv");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/users", userRoute);
app.use("/chats", chatRoute);
app.use("/messages", messageRoute);
app.use("/test", messageRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

const { database, username, password, dialect, host, logging } =
  require("./config/config").devolop;

const sequelize = new Sequelize(database, username, password, {
  dialect,
  host,
  logging,
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port: ${port}`);
});

// Set up WebSocket server
const wss = new WebSocket.Server({ server });

const MAX_CLIENTS = 2;
let chatClients = new Map(); // To track clients per chatId

function broadcastMessage(chatId, message) {
  const clients = chatClients.get(chatId) || [];
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

wss.on('connection', (ws, request) => {
  // Extract chatId from the query string
  const url = new URL(request.url, `http://${request.headers.host}`);
  const chatId = url.searchParams.get('chatId');

  if (!chatId) {
    ws.close(); // Reject connection if chatId is not provided
    return;
  }

  const clients = chatClients.get(chatId) || [];

  if (clients.length >= MAX_CLIENTS) {
    ws.close(); // Reject connection if client limit for chatId is reached
    console.log(`Rejected connection for chatId ${chatId}. Client limit reached.`);
    return;
  }

  clients.push(ws);
  chatClients.set(chatId, clients);
  console.log(`Client connected to chatId ${chatId}. Total clients: ${clients.length}`);

  ws.on('message', (message) => {
    console.log(`Received message in chatId ${chatId}: ${message}`);
    const parsedMessage = JSON.parse(message);
    broadcastMessage(chatId, parsedMessage);
  });

  ws.on('close', () => {
    const clients = chatClients.get(chatId) || [];
    chatClients.set(chatId, clients.filter(client => client !== ws));
    console.log(`Client disconnected from chatId ${chatId}. Total clients: ${clients.length}`);
  });

  ws.on('error', (error) => {
    console.error('WebSocket Error:', error);
  });
});
