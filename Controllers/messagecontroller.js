const chatModelDbDef = require("../Models/chatModelDbDef")
const dbDef = require("../../framework/dbModels/dbDef")
const dbService = require("../../framework/services/dbService")
const customError = require("../../framework/errorControllers/customError")
const errorMessage = require("../../framework/errorControllers/errorMessage.json")

async function create (req) {
  let body = req.body
  let id = dbService.createId()
  if (body.text === ""){
    throw new customError(errorMessage.dataNotFound)
  }
  let receiverUser = await dbService.findByPk(dbDef.profile,body.receiverId)
  if (!receiverUser){
    throw new customError(errorMessage.UserNotFound)
  }
  let data ={
    chatId: body.chatId,
    receiverId: body.receiverId,
    text: body.text,
    receiverName: receiverUser.name
  }
  let message = await dbService.create(chatModelDbDef.messageDbDef, data, id)
  return message
}

async function find(req) {
  let body = req.body
  let {chatId} = body
  let criteria = {
    chatId :  chatId 
  }

  let message = await dbService.find(chatModelDbDef.messageDbDef,criteria )
  if (message.length === 0 ){
    throw new customError(errorMessage.dataNotFound)
  }
  return message
}

module.exports = { create, find };
