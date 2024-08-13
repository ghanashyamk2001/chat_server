const Sequelize = require("sequelize");

const chatModel = {
  members: {
    type: Sequelize.JSONB,
  },
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  firstIdName: Sequelize.STRING,
  secondIdName: Sequelize.STRING,
};

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
