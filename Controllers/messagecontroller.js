const messageModel = require("../Models/chatModelDbDef").messageDbDef;
const userModel = require("../Models/chatModelDbDef").userDbDef;
const genChatId = require("../service/id_gen")

const createMessage = async (req, res) => {
  const body = req.body
  const { chatId, senderId, text } = body
  if (text === "") {
    const err = new Error("No message where entered");
    err.status = 404;
    throw err;
  }
  const senderUser = await userModel.findByPk(senderId);
  if (!senderUser) {
    const err = new Error("sender not found");
    err.status = 404;
    throw err;
  }
  const message = new messageModel({
    
    chatId,
    senderId,
    text,
    id: genChatId(),
    senderName: senderUser.name,
  });

  const response = await message.save();

  res.status(200).json(response);
};

const getMessage = async (req, res) => {
  const body =  req.body
  const { chatId } = body;

  const message = await messageModel.findAll({
    where: { chatId },
    order: [["createdAt", "ASC"]],
  });
  if (message.length === 0) {
    const err = new Error("No message found in this chat");
    err.status = 404;
    throw err;
  }
  res.status(200).json(message);
};

module.exports = { createMessage, getMessage };
