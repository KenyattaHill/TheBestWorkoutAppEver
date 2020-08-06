const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref:"User"},
  name: { type: String, required: true },
  exercises: [{
    id: Number,
    name: String,
    image: String,
    comment: String,
    sets: [{repetitions: Number, weight: Number}]
  }]
})

const Workout = mongoose.model("Workout", workoutSchema)
module.exports = Workout