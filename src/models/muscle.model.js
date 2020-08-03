const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const muscleSchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  isFront: { type: Boolean, required: true }
})

const Muscle = mongoose.model("Muscle", muscleSchema);

module.exports = Muscle;