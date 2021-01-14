const express = require("express");
const cors = require("cors");
const { join } = require("path");
const server = express();
const mongoose = require("mongoose")
const articlesRouter = require("./data") // ? <--
const authorsRouter = require("./authors")
const port = 3333;
server.use(cors());
server.use(express.json()); 
const loggerMiddleware = (req, res, next) => {
  console.log(`Logged ${req.url} ${req.method} -- ${new Date()}`);
  next();
};
server.use(loggerMiddleware);
server.use("/articles", articlesRouter) // ? <--
server.use("/authors", authorsRouter) // ? <--

mongoose
  .connect('mongodb://localhost:27017/articles', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port)
    })
  )
  .catch(err => console.log(err))
