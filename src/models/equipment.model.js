const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true }
})

const Equipment = mongoose.model("Equipment", equipmentSchema);

module.exports = Equipment;