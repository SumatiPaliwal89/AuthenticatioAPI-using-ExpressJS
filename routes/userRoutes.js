const express = require('express');
const router = express.Router();
const {getUser}=require("../controllers/userController");
const validateToken = require("../middleware/validateToken");

router.route("/").get(validateToken, getUser );
module.exports= router;