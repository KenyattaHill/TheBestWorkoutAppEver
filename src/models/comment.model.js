const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  _id: { type: Number, required: true },
  comment: { type: String, required: true },
  exercise: { type: Number, required: true },
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;