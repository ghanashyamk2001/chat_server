const Sequelize = require("sequelize");
const { v4: uuidv4 } = require('uuid');


const userModel = {
  id: { type: Sequelize.STRING, primaryKey:true, allowNull: false,defaultValue: () => uuidv4() },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { len: [3, 200] },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { len: [3, 200] },
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {len: [3, 200] },
  },
};

module.exports = { userModel };

// const mongoose =  require("mongoose")

// const userSchema = new mongoose.Schema(
//     {
//         name: {type: String, required: true, minlength: 3, maxlength: 30},
//         email: {type:String, required: true, minlength: 3, maxlength: 200, unique:true },
//         password: {type:String, required: true, minlength: 3, maxlength: 1024}
//     },
//     {
//         timestamps: true,
//     }
// );

// const userModel = mongoose.model("User", userSchema);

// module.exports = userModel;
