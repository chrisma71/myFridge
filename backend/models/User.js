import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userID: { type: String, required: true, unique: true },
  age: {type: Number, required: true},
  weight: { type: Number, required: true},
  goals: { type: String, required: true},
  calorieGoal: {type: Number, required: true},
  proteinGoal: { type: Number, required: true},
  preferences: { type: String, required: true},
  fridge: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);

export default User;