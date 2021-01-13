const { Schema } = require("mongoose")
const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const UserSchema = new Schema(
    {
        "_id": "string", // server generated
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
        "author": {
            "name": "string",
            "img": "string"
        },
        "cover": "string",
        "createdAt": Date, // server generated
        "updatedAt": Date // server generated
    }
)

UserSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("User", UserSchema)
