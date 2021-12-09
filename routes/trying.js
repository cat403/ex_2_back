const express = require("express");

const router = express.Router();
router.get("/", (req, res) => {
  res.send("TRY");
});
router.post("/", (req, res) => {
  console.log("in body", req.body);
  res.json({ ...req.body });
});
router.get("/nice", (req, res) => {
  res.send("NICE");
});
module.exports = router;
