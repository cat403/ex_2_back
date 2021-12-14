const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nutritionSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  date: Date,
  total: Number,
  meals: [{ foodName: String, calories: Number }],
});
const Nutrition = mongoose.model("Nutrition", nutritionSchema);
module.exports = Nutrition;
