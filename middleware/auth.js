const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.json({ error: "Unauthorized" });
  }
  try {
    const token = req.headers.authorization;
    let decodedData = jwt.verify(token, process.env.SECRET);
    req.userId = decodedData?.id;
    next();
  } catch (error) {
    console.error(error);
  }
};
module.exports = auth;
