const express = require("express");
const mongoose = require("mongoose");
const Nutrition = require("../models/Nutrition");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("got it");
});
// const nutritionSchema = Schema({
//   user: { type: Schema.Types.ObjectId, ref: "User" },
//   date: Date,
//   total: Number,
//   meals: [{ foodName: String, calories: Number }],
// });
router.get("/:id", auth, async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const userId = req.params.id;
    const dailySummary = await Nutrition.find({
      userName: userId,
      date: today,
    });
    res.json({
      meals: dailySummary[0].meals,
      totalCalories: dailySummary[0].total,
    });
  } catch (error) {
    console.error(error);
  }
});
router.post("/", auth, async (req, res) => {
  if (!(req.body.calories && req.body.foodName && req.body._id)) {
    return res.json({ error: "Missing fields" });
  }
  if (isNaN(req.body.calories)) {
    return res.json({
      error: "Please enter a number in the calories field",
    });
  }
  const currentDate = new Date().toISOString().slice(0, 10);
  if (req.body.save) {
    try {
      const savedMeals = await User.findOneAndUpdate(
        { _id: req.body._id },
        {
          $push: {
            savedMeals: {
              foodName: req.body.foodName,
              calories: req.body.calories,
            },
          },
        },
        { new: true }
      );
    } catch (error) {
      console.error(error);
    }
  }

  try {
    const dailyEntry = await Nutrition.findOneAndUpdate(
      {
        user: req.body._id,
        date: currentDate,
      },
      {
        $set: { user: req.body._id },
        $set: { date: currentDate },
        $inc: { total: req.body.calories },
        $push: {
          meals: { foodName: req.body.foodName, calories: req.body.calories },
        },
      },
      { new: true, upsert: true }
    );
    return res.json({
      date: dailyEntry.date,
      meals: dailyEntry.meals,
      todayTotalCalories: dailyEntry.total,
    });
  } catch (error) {
    console.error(error);
    res.json({
      error: "There was a problem adding your meal please check your input",
    });
  }
});
router.delete("/:id", auth, async (req, res) => {
  const user = req.params.id;
  const today = new Date().toISOString().slice(0, 10);
  const mealId = req.query.meal;
  let calories;
  try {
    const objectToBeDeleted = await Nutrition.findOne({ user, date: today });
    objectToBeDeleted.meals.map((mealObject) => {
      if (mealId == mealObject._id) {
        calories = mealObject.calories;
      }
    });
  } catch (error) {
    console.error(error);
  }
  try {
    const newMealList = await Nutrition.findOneAndUpdate(
      { user, date: today },
      { $pull: { meals: { _id: mealId } }, $inc: { total: -calories } },
      { new: true }
    );
    res.json({ meals: newMealList.meals, total: newMealList.total });
  } catch (error) {
    console.error(error);
    res.json({ error: "delete unsuccessful" });
  }
});
module.exports = router;
