const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
  _id: { type: Number, require: true },
  name: { type: String, require: true }
})

const Equipment = mongoose.model("Equipment", equipmentSchema);

module.exports = Equipment;