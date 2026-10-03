import mongoose from 'mongoose';
const { Schema } = mongoose;

const userTakens = new Schema({
  quizId: { type: Schema.Types.ObjectId, required: true, ref: 'Quiz' },
  total: { type: Number, required: true },
  obtained: { type: Number, required: true },
});

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: false,
  },
  clerkId: {
    type: String,
    required: false,
    default: "",
  },
  img: {
    type: String,
    default: "https://api.dicebear.com/7.x/avataaars/svg?seed=Quizee",
  },
  desc: {
    type: String,
    default: "",
  },
  yt: {
    type: String,
    default: "",
  },
  lkd: {
    type: String,
    default: "",
  },
  quiz: [{
    type: Schema.Types.ObjectId,
    default: [],
    ref: "Quiz"
  }],
  takens: {
    type: [userTakens],
    default: [],
  }
}, { timestamps: true });

// Create a model from the schema
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
