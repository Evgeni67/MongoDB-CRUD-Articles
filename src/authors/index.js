const { CallTracker } = require("assert");
const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");
const uniqid = require("uniqid");
const AuthorSchema = require("./schema");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const authors = await AuthorSchema.find();
    res.send(authors);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const newAuthor = new AuthorSchema(req.body);
    const { _id } = await newAuthor.save();

    res.status(201).send(_id);
  } catch (error) {
    next(error);
  }
});
router.get("/:_id", async (req, res, next) => {
  try {
    const authorId = req.params._id;
    const currentAuthor = await AuthorSchema.findById(
      mongoose.Types.ObjectId(authorId)
    );
    res.send(currentAuthor);
  } catch (error) {
    console.log(error);
  }
});
router.put("/:_id/addArticle/:articleId", async (req, res, next) => {
  try {
    const authorId = req.params._id;
    //const articleId = mongoose.Types.ObjectId(req.params._id);
    console.log(articleId)
    const currentAuthor = await AuthorSchema.findByIdAndUpdate(
      mongoose.Types.ObjectId(authorId),
      {
        $push: { articles: req.params.articleId },
      },
      { new: true }
    );

    res.send(currentAuthor);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
//BACKEND
// Your backend should now save authors in their own collection, therefore you should
// link articles to their corresponding author and you should have CRUD for authors.
// Complete past homework :)
