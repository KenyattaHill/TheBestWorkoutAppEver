const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  _id: { type: Number, required: true },
  image: { type: String, required: true },
  exercise: { type: Number, required: true },
})

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;