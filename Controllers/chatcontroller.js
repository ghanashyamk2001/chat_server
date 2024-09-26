const chatModel = require("../Models/chatModelDbDef");
const dbServive = require("../../framework/services/dbService");
const dbDef = require("../../framework/dbModels/dbDef");
const errorMessage = require("../../framework/errorControllers/errorMessage.json");
const CustomError = require("../../framework/errorControllers/customError");
const { Op, JSON } = require("sequelize");

async function create(req) {
  let body = req.body;
  let firstId = body.sessionData.profileId;
  let secondId = body.receiverId;
  let id = dbServive.createId();
  let senderUser = await dbServive.findByPk(dbDef.profile, firstId);
  let receiverUser = await dbServive.findByPk(dbDef.profile, secondId);
  let criteria = {
    members: { [Op.contains]: [firstId, secondId] },
  };
  let chat = await dbServive.findOneData(chatModel.chatDbDef, criteria);
  if (chat) {
    return chat;
  }
  let data = {
    users: [firstId, secondId],
    senderdIdName: senderUser.name,
    receiverIdName: receiverUser.name,
    chatName: "sender",
    groupAdmin: "",
    isGroup: false,
  };
  let chatCreate = await dbServive.create(chatModel.chatDbDef, data, id);
  return chatCreate;
}

async function groupChat(req) {
  let body = req.body;
  id = dbServive.createId();
  if (!body.chatName || !body.users) {
    throw new CustomError(errorMessage.dataNotFound);
  }
  let data = {
    chatName: body.chatName,
    users: body.users,
    isGroup: true,
    groupAdmin: body.sessionData.profileId,
  };
  let groupChat = await dbServive.create(chatModel.chatDbDef, data, id);
  return groupChat;
}

async function ChatUpdate(req) {
  body = req.body;
  let findByPk = await dbServive.findByPk(chatModel.chatDbDef, body.id);
  if (!findByPk) {
    throw new CustomError(errorMessage.dataNotFound);
  }
  let update = await dbServive.update(findByPk, body);
  return update;
}

async function removeUser(req) {
  body = req.body;
  let userDetail = await dbServive.findByPk(chatModel.chatDbDef, body.id);
  if (!userDetail) {
    throw new CustomError(errorMessage.dataNotFound);
  }
  if (!userDetail.users || !userDetail.users.includes(body.userId)) {
    throw new CustomError(errorMessage.UserAlreadyExist);
  }
  let array = userDetail.users;
  let data = await array.filter((item) => item !== body.userId);
  console.log(data);
  criteria = {
    users: data,
  };
  let file = await dbServive.update(userDetail, criteria);
  console.log(file);
  let updatedChat = await dbServive.findByPk(chatModel.chatDbDef, body.id);
  return updatedChat;
}

async function addUser(req) {
  let body = req.body;
  let userDetail = await dbServive.findByPk(chatModel.chatDbDef, body.id);
  if (!userDetail) {
    throw new CustomError(errorMessage.dataNotFound);
  }
  let users = userDetail.users;
  if(!users.includes(body.userId)){
    users.push(body.userId);
  } else{
    throw new CustomError(errorMessage.UserAlreadyExist)
  }
  criteria = {
    users: users,
  };

  let updatedChat = await dbServive.update(userDetail, criteria);
  return updatedChat;
}

async function find(req) {
  let body = req.body;
  let senderId = body.sessionData.profileId;

  if (!senderId) {
    throw new CustomError(errorMessage.UserNotFound);
  }
  criteria = {
    members: {
      [Op.contains]: [senderId],
    },
  };
  let chatList = await dbServive.find(chatModel.chatDbDef, criteria);
  let result = chatList.map((chat) => {
    const [firstId, secondId] = chat.members;
    let otherUserId;
    let otherUserName;

    if (senderId === firstId) {
      otherUserId = secondId;
      otherUserName = chat.receiverIdName;
    } else if (senderId === secondId) {
      otherUserId = firstId;
      otherUserName = chat.senderdIdName;
    }
    return {
      chatId: chat.id,
      otherUserId,
      otherUserName,
    };
  });
  return result;
}
async function findByPk(req) {
  let body = req.body;
  let firstId = body.sessionData.profileId;
  let secondId = body.receiverId;

  let criteria = {
    members: { [Op.contains]: [firstId, secondId] },
  };
  let chat = await dbServive.findOneData(chatModel.chatDbDef, criteria);
  if ((!firstId, !secondId)) {
    throw new CustomError(errorMessage.UserNotFound);
  }
  return chat;
}

module.exports = {
  create,
  find,
  findByPk,
  groupChat,
  ChatUpdate,
  removeUser,
  addUser,
};
