const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  _id: { type: Number, require: true },
  comment: { type: String, require: true },
  exercise: { type: Number, required: true },
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;