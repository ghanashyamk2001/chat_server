const chatModelDb = require("./dbModel/chatModel")
const messageModelDb = require("./dbModel/messageModel")
const userModelDb = require("./dbModel/userModel")
const { Sequelize } = require("sequelize")

const chatObj = new Sequelize(require("../config/config").devolop)

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

const userDbDef = chatObj.define("userModel",
    userModelDb.userModel,
    {
        tableName : "userModel",
        timestamps : true
    }

)

chatObj.authenticate()
chatObj.sync({ alter : true })

module.exports = { chatDbDef, messageDbDef, userDbDef}
