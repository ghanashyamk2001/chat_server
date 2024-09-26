const Sequelize = require("sequelize");
const { toDefaultValue } = require("sequelize/lib/utils");

const messageModel = {
  id: { type: Sequelize.STRING, primaryKey: true },
  chatId: { type: Sequelize.STRING },
  receiverId: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING },
  receiverName: { type: Sequelize.STRING, defaultValue: '', allowNull: false},
};

module.exports = {
  messageModel,
};

// const mongoose = require("mongoose")

// const messageSchema = new mongoose.Schema({
//     chatId: String,
//     senderId: String,
//     text: String
// },{
//     timestamps: true

// })

// const messageModel = mongoose.model("Message", messageSchema)

// module.exports = messageModel
