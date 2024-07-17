const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");
const app = express();

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
  
// Start the server

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the chat app API...");
});
const file = require("./Models/userModel")

const data = {

  "status":"200",
  "data":""

}
app.post("/hello",async (req, res) =>{
  const users = await file.find()
  res.json(users)
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});