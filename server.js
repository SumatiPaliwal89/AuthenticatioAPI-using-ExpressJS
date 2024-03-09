const express = require('express');
const errorHandler = require("./middleware/errorHandler");
const dotenv = require('dotenv').config();

const app = express()

const port= process.env.PORT || 3000;

app.use(express.json());

app.use("/api/user/",require("./routes/userRoutes"));
app.use("/api/auth",require("./routes/authRoutes"));

app.use(errorHandler);

app.listen(port, () =>{
  console.log(`Server is running on port ${port}`);
});