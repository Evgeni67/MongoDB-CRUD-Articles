const { Schema, model, Mongoose } = require("mongoose")

const AuthorSchema = new Schema({
  name: String,
  img: String
  //,articles:[{ type: Schema.Types.ObjectId, ref: "Articles" }]
})

module.exports = model("Author", AuthorSchema)