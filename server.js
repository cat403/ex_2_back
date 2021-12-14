const express = require("express");
const trying = require("./routes/trying");
const login = require("./routes/login");
const nutrition = require("./routes/nutrition");
const cors = require("cors");
const dbConnect = require("./dbConnect.js");
require("dotenv").config();
const port = process.env.PORT || 8001;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/try", trying);
app.use("/login", login);
app.use("/nutrition", nutrition);
dbConnect();
app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
