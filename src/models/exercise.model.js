const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  description: String,
  category: { type: Number, ref: 'Category' },
  muscles: [{ type: Number, ref: 'Muscle' }],
  musclesSecondary: [{ type: Number, ref: 'Muscle' }],
  equipment: [{ type: Number, ref: 'Equipment' }]
})

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;