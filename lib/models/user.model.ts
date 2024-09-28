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
  clerkId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true
  },
  yt: {
    type: String,
    required: true
  },
  lkd: {
    type: String,
    required: true
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
