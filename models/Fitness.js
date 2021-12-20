const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fitnessSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  savedWorkouts: [
    {
      name: String,
      timer: [
        {
          repeat: Number,
          exerciseName: String,
          duration: String,
          break: String,
        },
      ],
    },
  ],
});
const Fitness = mongoose.model("Fitness", fitnessSchema);
module.exports = Fitness;
