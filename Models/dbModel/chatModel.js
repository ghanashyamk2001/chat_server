const Sequelize = require("sequelize");

const chatModel = {
  users: {
    type: Sequelize.JSONB,
  },
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  chatName : {
    type :Sequelize.STRING
  },
  isGroup: {
    type: Sequelize.BOOLEAN
  },
  groupAdmin:{
    type: Sequelize.STRING
  },
  senderIdName: {
    type : Sequelize.STRING
  },
  receiverIdName:{
    type:Sequelize.STRING
  }
}   

module.exports = {
  chatModel,
};

// const mongoose = require("mongoose")

// const chatSchema = new mongoose.Schema({
//     members: Array,
// },{
//     timestamps: true,
// })

// const chatModel = mongoose.model("Chat", chatSchema)

// module.exports = chatModel
