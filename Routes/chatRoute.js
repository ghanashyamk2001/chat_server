const express = require("express")
const chatController = require("../Controllers/chatcontroller")
const asyncHandler = require("../error_controller/asyncHandler")


const router = express.Router()

router.post("/createchat", asyncHandler(chatController.createChat));
router.post("/finduser", asyncHandler(chatController.findUserChat))
router.post("/findchat", asyncHandler(chatController.findChat))

module.exports = router