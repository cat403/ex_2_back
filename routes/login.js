const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const router = express.Router();

//Handling the sign-up of new users
router.get("/new-user", async (req, res) => {
  res.send("hi");
});
router.post("/new-user", async (req, res) => {
  const newUser = { ...req.body, _id: mongoose.Types.ObjectId() };
  console.log(newUser);
  const createNewUser = new User(newUser);
  try {
    const createdNewUser = await createNewUser.save();
    console.log(createdNewUser);
  } catch (error) {
    console.error("THIS IS ERROR", error);
    res.json({ error: "duplicate", field: error.keyValue });
  }

  //   try {
  //     const createNewUser = new User(newUser);
  //     const createdNewUser = await createNewUser.save();
  //     console.log(createdNewUser);
  //   } catch (error) {
  //     console.error(error);
  //     process.exit(1);
  //   }
});
//Handling the login
router.get("/existing-user", async (req, res) => {
  res.send("there");
});

module.exports = router;
