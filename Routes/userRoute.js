const express = require("express");
const userController = require("../Controllers/userController")
const asyncHandler = require ("../error_controller/asyncHandler")

const router = express.Router();

router.post("/register",asyncHandler(userController.registerUser));
router.post("/login",asyncHandler(userController.loginUser))
router.post("/get",asyncHandler(userController.getUsers))
router.post("/all",asyncHandler(userController.getAll))

module.exports = router;