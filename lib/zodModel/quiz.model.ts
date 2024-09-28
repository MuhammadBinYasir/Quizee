"use client"

import { z } from "zod"

const questionSchema = z.object({
    question: z.string().min(1, { message: "Question cannot be empty" }),
    options: z.array(z.string().min(1, { message: "Option cannot be empty" }))
        .min(4, "There must be exactly 4 options")
        .max(4, "There must be exactly 4 options"),
    ans: z.string({
        required_error: "Please select a Answer.",
    }),

});

export const quizZod = z.object({
    title: z.string().min(1, {
        message: "It is a required field!"
    }).max(50, {
        message: "No More than 50 Characters"
    }),

    desc: z.string().min(50, {
        message: "Minimum of 50 characters"
    }).max(500, {
        message: "Maximum of 300 characters"
    }),

    category: z.string({
        required_error: "Please select a Category.",
    }),

    visibility: z.string({
        message: "Required Field"
    }),

    questions: z.array(questionSchema).min(1, { message: "You must add at least one question" })
})
