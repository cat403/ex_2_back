const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = {
  _id: Schema.Types.ObjectId,
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  weight: Number,
  goal: Number,
  rmr: Number,
  avatarImage: { data: Buffer, contentType: String },
  savedMeals: [{ foodName: String, calories: Number }],
  burnedCalories: [{ date: Date, caloriesBurned: Number }],
};
const User = mongoose.model("User", userSchema);
module.exports = User;
