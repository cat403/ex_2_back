const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    let decodedData = jwt.verify(token, env.process.SECRET);
    req.userId = decodedData?.id;
    next();
  } catch (error) {
    console.error(error);
  }
};
module.exports = auth;
