const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");
const ArticleSchema = require("./schema")
const router = express.Router();

const readFile = (fileName) => {
  const buffer = fs.readFileSync(path.join(__dirname, fileName));
  const fileContent = buffer.toString();
  return JSON.parse(fileContent);
};
router.get("/", async (req, res, next) => {
    try {
      const users = await ArticleSchema.find()
      res.send(users)
    } catch (error) {
      next(error)
    }
  })

  router.post("/", async (req, res, next) => {
    try {
      const newUser = new ArticleSchema(req.body)
      newUser.createdAt = new Date()
      newUser.updatedAt = new Date()
      newUser._id = uniqid();
      const { _id } = await newUser.save()
  
      res.status(201).send(_id)
    } catch (error) {
      next(error)
    }
  })
  router.get("/:id", async (req, res, next) => {
    try {
      const id = req.params.id
      const user = await ArticleSchema.findById(id)
      if (user) {
        res.send(user)
      } else {
        const error = new Error()
        error.httpStatusCode = 404
        next(error)
      }
    } catch (error) {
      console.log(error)
      next("While reading user by id in the list a problem occurred!")
    }
  })
  router.delete("/:id", async (req, res, next) => {
    try {
      const id = req.params.id
      const user = await ArticleSchema.findByIdAndDelete(id)
      if (user) {
        res.send("Deleted")
      } else {
        const error = new Error()
        error.httpStatusCode = 404
        next(error)
      }
    } catch (error) {
      console.log(error)
      next("While deleting user by id from the list a problem occurred!")
    }
  })
  module.exports = router;