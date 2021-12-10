const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = {
  _id: Schema.Types.ObjectId,
  userName: { String, required },
  email: { String, required },
  weight: Number,
  goal: Number,
  rmr: Number,
  avatarImage: { data: Buffer, contentType: String },
};

export default userSchema;
