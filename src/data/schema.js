const { Schema } = require("mongoose")
const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const ArticleSchema = new Schema(
    {
        "headLine": "string",
        "subHead": "string",
        "content": "string",
        "category": "string",
        "reviews": [
            {
              text: {
                type: String,
                required: false,
                lowercase: true,
              },
              user: {
                type: String,
                required: false,
                lowercase: true,
              },
            },
          ],
        "author": { type: Schema.Types.ObjectId, ref: "Author" },
        "cover": "string"
    },
    { timestamps: true }
)

ArticleSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("Articles", ArticleSchema)
