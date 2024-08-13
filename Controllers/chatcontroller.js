const chatModel = require("../Models/chatModelDbDef").chatDbDef;
const userModel = require("../Models/chatModelDbDef").userDbDef;
const Sequelize = require("sequelize");
const genChatId = require("../service/id_gen")
const { Op } = require("sequelize");

const createChat = async (req, res) => {

  const body = req.body
  const { firstId, secondId } = body
  const firstUser = await userModel.findByPk(firstId);
  const secondUser = await userModel.findByPk(secondId);

  let chat = await chatModel.findOne({
    where: {
      members: { [Sequelize.Op.contains]: [firstId, secondId] },
    },
  });

  if (chat) {
    return res.status(200).json(chat);
  }

  const newChat = await chatModel.create({
    members: [firstId, secondId],
    firstIdName: firstUser.name,
    secondIdName: secondUser.name,
    id: genChatId(),
  });
  res.status(200).json(newChat);
};


const findUserChat = async (req, res) => {
  const body =  req.body
  const { userId } = body
  const chatList = await chatModel.findAll({
    attributes: ["secondIdName", "members", "id"],
    where: {
      members: {
        [Op.contains]: [userId],
      },
    },
  });
  if (!userId) {
    const err = new Error("user not dound");
    err.status = 400;
    throw err;
  }
  res.status(200).json(chatList);
};

const findChat = async (req, res) => {
  const body = req.body
  const { firstId, secondId } = body;

  const chats = await chatModel.findOne({
    attributes: ["members", "id", "secondIdName"],
    where: {
      members: { [Op.contains]: [firstId, secondId] },
    },
  });
  if ((!firstId, !secondId)) {
    const err = new Error("invalid user");
    err.status = 400;
    throw err;
  }

  res.status(200).json(chats);
};

module.exports = { createChat, findUserChat, findChat };