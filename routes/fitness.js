const express = require("express");
const Fitness = require("../models/Fitness");
const User = require("../models/User");
const router = express.Router();

router.get("/", (req, res) => {
  //test.
  res.send("fitness");
});
router.get("/:id/calories", (req, res) => {
  //get todays calories burned
});
router.post("/:id/calories", async (req, res) => {
  const userId = req.params.id;
  const calories = req.body.calories;
  const today = new Date().toISOString().slice(0, 10);
  try {
    const data = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { burnedCalories: { date: today, caloriesBurned: calories } } },
      { upsert: true }
    );
  } catch (error) {
    res.json({ error: "Something went wrong with the save" });
    console.error(error);
  }
  console.log(userId, calories);
});
router.get("/:id", (req, res) => {
  //get exercises
});
router.post("/:id", (req, res) => {
  // save exercises
});
router.delete("/:id", (req, res) => {
  //delete an exercise
});

module.exports = router;
