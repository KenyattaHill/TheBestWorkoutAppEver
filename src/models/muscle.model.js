const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const muscleSchema = new Schema({
  _id: { type: Number, require: true },
  name: { type: String, require: true },
  isFront: {type: Boolean, require: true}
})

const Muscle = mongoose.model("Muscle", muscleSchema);

module.exports = Muscle;