const express = require("express");
const messageController = require("../Controllers/messagecontroller");
const asyncHandler = require("../error_controller/asyncHandler")

const router = express.Router()

router.post("/createmessage", asyncHandler(messageController.createMessage));
router.post("/getmessage", asyncHandler(messageController.getMessage))

module.exports = router
