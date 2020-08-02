const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  _id: { type: Number, require: true },
  image: { type: String, require: true },
  exercise: {type: Number, required: true},
})

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;