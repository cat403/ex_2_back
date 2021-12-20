const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  //test.
  res.send("fitness");
});
router.get("/:id/calories", (req, res) => {
  //get todays calories burned
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
