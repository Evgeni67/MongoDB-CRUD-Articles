const express = require("express");
const fs = require("fs");
const  mongoose  = require("mongoose");
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
  router.put("/:id", async (req, res, next) => {
    try {
      const id = req.params.id
      const user = await ArticleSchema.findByIdAndUpdate(id, req.body)
      if (user) {
        res.send("Updated")
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

  // // // //  BACKEND
  // // // //  Your backend should now have the possibility to add a review to an
  // // // //  article. Mongo's preferred data design should be to embed reviews into
  // // // //  articles, therefore you should implement the following endpoints

  // // // //1  GET /articles/:id/reviews => returns all the reviews for the specified article
  // // // //2  GET /articles/:id/reviews/:reviewId => returns a single review for the specified article
  // // // //3  POST /articles/:id => adds a new review for the specified article
  // // // //4  PUT /articles/:id/reviews/:reviewId => edit the review belonging to the specified article
  // // // //5  DELETE /articles/:id/reviews/:reviewId => delete the review belonging to the specified article

  // // // //  A review will look like:
  // // // //      {
  // // // //          "text": "string",
  // // // //          "user": "string"
  // // // //      }

//1
router.get("/:id/reviews", async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await ArticleSchema.findById(id)
    if (user.reviews.length > 0) {
      res.send(user.reviews)
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
//2
router.get("/:id/reviews/:reviewId", async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await ArticleSchema.findById(id)
    if (user.reviews.length > 0) {
      res.send(user.reviews)
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
//3
router.post("/:id", async (req, res, next) => {
  try {
    const { _id } = await ArticleSchema.findByIdAndUpdate(req.params.id,
      {
        $push: { reviews: req.body },
      },
      { runValidators: true, new: true }
    )
    res.status(201).send(_id)
  } catch (error) {
    next(error)
  }
})

  module.exports = router;