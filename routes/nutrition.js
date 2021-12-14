const express = require("express");
const mongoose = require("mongoose");
const Nutrition = require("../models/Nutrition");
const User = require("../models/User");
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
router.post("/", async (req, res) => {
  if (!(req.body.calories && req.body.foodName && req.body._id)) {
    return res.json({ error: "Missing fields" });
  }
  const currentDate = new Date().toISOString().slice(0, 10);
  console.log(currentDate, req.body);
  try {
    const dailyEntry = await Nutrition.findOneAndUpdate(
      {
        _id: req.body._id,
        date: currentDate,
      },
      {
        $set: { date: currentDate },
        $inc: { total: req.body.calories },
        $push: {
          meals: { foodName: req.body.foodName, calories: req.body.calories },
        },
      },
      { new: true, upsert: true }
    );
    console.log("DAILY ENTRY", dailyEntry);
  } catch (error) {
    console.error(error);
  }
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
      console.log("SAVED MEALS", savedMeals);
    } catch (error) {
      console.error(error);
    }
  }
  //   console.log(req.body);
  //   const newMealEntry = await Nutrition.findOneAndUpdate(
  //     { user: req.body._id , date:  },
  //     { $push: { dailyLog: req.body } , $inc: {dailylog total} }
  //   );
  //   console.log(newMealEntry);
});
module.exports = router;
