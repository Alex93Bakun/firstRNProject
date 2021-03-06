const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  dateOfBirth: Date,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
