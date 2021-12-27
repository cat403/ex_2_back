const express = require("express");
const Fitness = require("../models/Fitness");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", (req, res) => {
  //test.
  res.send("fitness");
});
router.get("/:id/calories", auth, async (req, res) => {
  const today = new Date(new Date().toISOString().slice(0, 10));

  try {
    const user = await User.findById(req.params.id);
    let calories = user.burnedCalories.map((object) => {
      if (object.date.valueOf() === today.valueOf()) {
        return object.caloriesBurned;
      } else {
        return 0;
      }
    });
    calories = calories.reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    });
    res.json({ caloriesBurned: calories });
  } catch (error) {
    console.error({ error: "Couldn't find user" });
  }
  //get todays calories burned
});
router.post("/:id/calories", auth, async (req, res) => {
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
});
router.get("/:id", auth, async (req, res) => {
  try {
    const userFitness = await Fitness.findOne({ user: req.params.id });
    res.json({ exercises: userFitness.savedWorkouts });
  } catch (error) {
    console.error(error);
    res.json({ error: "Couldn't find user" });
  }
  //get exercises
});
router.post("/:id", auth, async (req, res) => {
  const exercise = { ...req.body };
  delete exercise.routine;
  const routine = req.body.routine;
  const user = req.params.id;
  console.log(exercise);
  try {
    const savedExercise = await Fitness.findOneAndUpdate(
      { user: user },
      {
        $push: {
          savedWorkouts: {
            name: routine,
            timer: {
              repeat: exercise.repeat,
              exerciseName: exercise.exerciseName,
              duration: exercise.exerciseTime,
              break: exercise.breakTime,
            },
          },
        },
      },
      { upsert: true, new: true }
    );
    console.log(savedExercise);
  } catch (error) {
    console.error(error);
    res.json({ error: "Something went wrong with the save" });
  }
  // save exercises
});
router.delete("/:id", auth, async (req, res) => {
  try {
    const updatedExerciseList = await Fitness.findOneAndUpdate(
      { user: req.params.id },
      { $pull: { savedWorkouts: { _id: req.query.exercise } } },
      { new: true }
    );
    res.json({ exercise: updatedExerciseList });
  } catch (error) {
    res.json({ error: "Couldn't complete delete" });
    console.error(error);
  }
  //delete an exercise
});

module.exports = router;
