const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const router = express.Router();

//Handling the sign-up of new users
router.get("/new-user", async (req, res) => {
  res.send("hi");
});
router.post("/new-user", async (req, res) => {
  if (req.body.action === "signup") {
    const newUser = { ...req.body, _id: mongoose.Types.ObjectId() };
    console.log(newUser);
    const createNewUser = new User(newUser);
    try {
      const userNameExists = await User.exists({ userName: req.body.userName });
      if (userNameExists) {
        return res.json({
          error: `User name ${req.body.userName}is already in use`,
        });
      }
    } catch (error) {
      console.error(error);
    }
    try {
      const emailExists = await User.exists({ email: req.body.email });
      if (emailExists) {
        return res.json({ error: `Email ${req.body.email} is already in use` });
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const createdNewUser = await createNewUser.save();
      console.log(createdNewUser);
      res.json(createdNewUser);
    } catch (error) {
      console.error("THIS IS ERROR", error);
      res.json({
        error:
          "Something went wrong with the process please double check the information and try again",
      });
    }
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
