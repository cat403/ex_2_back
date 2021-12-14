const express = require("express");
const mongoose = require("mongoose");
const nutrition = require("../models/Nutrition");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("got it");
});
router.post("/", (req, res) => {
  console.log(req.body);
});
module.exports = router;
