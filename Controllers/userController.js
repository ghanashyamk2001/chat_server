const userModel = require("../Models/chatModelDbDef").userDbDef;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const genChatId = require("../service/id_gen");

const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  const body = req.body
  const email = body.email
  const password = body.password
  const name = body.name

  let user = await userModel.findOne({ where:{email}  });

  if (user) {
    return res.status(400).json("User with given email already exist...");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  user = userModel.create({
    name,
    email,
    password: hashPassword,
    id:genChatId()
  });

  const token = createToken(user.id);

  res.status(200).json({ _id: user.id, name, email, token });
};

const loginUser = async (req, res) => {
  const body = req.body
  const { email, password} = body

  const user = await userModel.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json("Invalid email or password...");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(400).json("Invalid email or password...");
  }

  const token = createToken(user.id);

  res.status(200).json({ _id: user.id, name: user.name, email, token });
};

const getUsers = async (req, res) => {
  const body = req.body
  const data = body._id

  const user = await userModel.findByPk(data);

  if (!user) {
    return res.status(400).json("user not found");
  }

  res.status(200).json(user);
};


const getAll = async (req, res) => {
  const body = req.body

  const user = await userModel.findAll(body);

  res.status(200).json(user);
};

module.exports = { registerUser, loginUser, getUsers, getAll };
