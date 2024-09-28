import mongoose from "mongoose";
const { Schema } = mongoose;

const QuestionSchema = new Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    ans: { type: String, required: true }
});

const Takens = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    total: { type: Number, required: true },
    obtained: { type: Number, required: true },
});

const QuizSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    attempts: {
        type: Number,
        default: 0
    },
    ratio: {
        type: Number,
        set: (value: number) => {
            return Number(value).toFixed(2);
        },
        get: (value: number) => {
            return value.toFixed(2);
        },
        default: 0,
    },
    questions: {
        type: [QuestionSchema],
        required: true
    },
    total: {
        type: Number,
        required: true,
    },
    takens: [{
        type: [Takens],
        default: [],
    }],
    visibility: {
        type: String,
        enum: ["public", "private"],
        required: true
    },
}, { timestamps: true })

const QuizModel = mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);

export default QuizModel;