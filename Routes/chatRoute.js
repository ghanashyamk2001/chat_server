const express = require("express")
const { create } = require("../Models/chatModel")
const { createChat, findUserChat, findChat } = require("../Controllers/chatcontroller")

const router = express.Router()

router.post("/", createChat);
router.get("/:userId", findUserChat)
router.get("/find/:firstId/:secondId", findChat)

module.exports = router