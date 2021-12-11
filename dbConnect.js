const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedtopology: true,
    });
    console.log(`connected to MongoDB: ${connection.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
module.exports = dbConnect;
