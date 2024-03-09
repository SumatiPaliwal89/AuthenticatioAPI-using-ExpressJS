const asyncHandler = require("express-async-handler");
const serv = require('../service/services');

const signup = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({
       error: "All fields are mandatory." });
  }

  try {
   await serv.newUser(req.body)
    res.status(201).json({
      success: true,
      message: "User Created Successfully"
    });
  } catch (error) {
    res.status(500).json({ error: "User already registered" });
  }
});


const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  } else {
    try {
      const token = await serv.loginToken(req.body); // Await the promise to resolve
      if (!token) {
        res.status(401);
        throw new Error("email or password is not valid");
      } else {
        res.status(200).json({ 
          success: true,
          message: "User logged in Succesfully",
          jwt: token
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Email or password is invalid" });
    }
  }
});


module.exports={ signup,login};