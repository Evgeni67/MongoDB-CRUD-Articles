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
        "author": {
            "name": "string",
            "img": "string"
        },
        "cover": "string",
    }
)

UserSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("User", UserSchema)
