const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

//Handling the sign-up of new users
router.get("/new-user", async (req, res) => {
  res.send("hi");
});
router.post("/new-user", async (req, res) => {
  if (req.body.action === "signup") {
    if (!(req.body.action && req.body.userName && req.body.email)) {
      return res.json({ error: "There are missing fields" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = {
      ...req.body,
      _id: mongoose.Types.ObjectId(),
      password: hashedPassword,
    };
    const createNewUser = new User(newUser);
    try {
      const userNameExists = await User.exists({ userName: req.body.userName });

      if (userNameExists) {
        return res.json({
          error: `User name ${req.body.userName} is already in use`,
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
      const token = jwt.sign(
        {
          email: createdNewUser.email,
          id: createdNewUser._id,
        },
        process.env.SECRET,
        { expiresIn: "2h" }
      );
      const sanUser = createdNewUser._doc;
      delete sanUser.password;
      res.json({ user: sanUser, token });
    } catch (error) {
      console.error(error);
      res.json({
        error:
          "Something went wrong with the process please double check the information and try again",
      });
    }
  }
  if (req.body.action === "check availability") {
    try {
      const checkValue = { userName: req.body.userName };
      const available = !(await User.exists(checkValue));
      res.json({ available });
    } catch (error) {
      console.error(error);
    }
  }
});
//Handling the login
router.get("/existing-user", async (req, res) => {
  res.send("there");
});
router.post("/existing-user", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const existingUser = await User.findOne({ userName });
    if (!existingUser) {
      return res.json({ error: "Couldn't find user" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.json({ error: "Invalid password" });
    }
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      process.env.SECRET,
      { expiresIn: "2h" }
    );
    const sanUser = existingUser._doc;
    delete sanUser.password;
    res.json({ user: sanUser, token });
  } catch (error) {
    console.error(error);
    res.json({ error: "Couldn't connect to db" });
  }
});
module.exports = router;
