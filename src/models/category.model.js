const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true }
})

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;