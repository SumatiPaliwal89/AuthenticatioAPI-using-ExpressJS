const asyncHandler = require("express-async-handler");


const getUser=asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    "message":"Get user details",
    "data": req.user
  });
});

module.exports={ getUser};