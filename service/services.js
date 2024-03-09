const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const { access } = require('fs/promises');

const url = process.env.CONNECTION_STRING;

const newUser = asyncHandler(async ({ firstname, lastname, email, password }) => {
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db('alexa-sample');
  const users = db.collection('users');

  const userAvailable = await users.findOne({ email });
  if (userAvailable) {
    client.close();
    throw new Error("User already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await users.insertOne({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  client.close();
  
});

const loginToken = asyncHandler(async ({ email, password }) => {
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db('alexa-sample');
  const users = db.collection('users');

  const userAvailable = await users.findOne({ email });
  if (userAvailable && (await bcrypt.compare(password, userAvailable.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          _id: userAvailable._id,
          firstname: userAvailable.firstname,
          lastname: userAvailable.lastname,
          email: userAvailable.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET, 
      { expiresIn: "15m" }
    );
    
    client.close();
    return accessToken ;
  } else {
    client.close();
    accesstoken={};
    return accessToken;
  }
});


module.exports = { newUser, loginToken };

