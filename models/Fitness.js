const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fitnessSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  dailyLog: { date: Date, caloriesBurned: Number },
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
export default Fitness;
