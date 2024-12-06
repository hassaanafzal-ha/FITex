const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  age: { type: Number, required: true },
  bmi: { type: Number, required: true },
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = UserInfo;
