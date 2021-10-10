require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`MongoDB Connected`))
  .catch((error) =>
    console.error(`Error: ${error.message}`.red.underline.bold)
  );
