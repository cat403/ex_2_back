const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nutritionSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  dailyLog: [
    {
      date: DATE,
      total: Number,
      meals: [{ foodName: String, calories: Number }],
    },
  ],
  savedMeals: [{ foodName: String, calories: Number }],
});
const Nutrition = mongoose.model(Nutrition, nutritionSchema);
export default Nutrition;
