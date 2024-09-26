const chatModelDb = require("./dbModel/chatModel")
const messageModelDb = require("./dbModel/messageModel")
const { Sequelize } = require("sequelize")

const chatObj = new Sequelize(require("../../config/local.config").development)

const chatDbDef = chatObj.define("chatModel",
    chatModelDb.chatModel,
    {
        tableName : "chatModel",
        timestamps : true       
    }
)


const messageDbDef = chatObj.define("messageModel",
    messageModelDb.messageModel,
    {
        tableName : "messageModel",
        timestamps : true       
    }
)



chatObj.authenticate()
chatObj.sync({ alter : true })

module.exports = { chatDbDef, messageDbDef, }
