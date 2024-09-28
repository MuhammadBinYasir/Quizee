"use client"

import { z } from "zod"

export const userZod = z.object({
  name: z.string().min(1, {
    message: "It is a required field!"
  }),
  desc: z.string().min(50, {
    message: "Minimum of 50 characters"
  }).max(500, {
    message: "Maximum of 500 characters"
  }),
  image: z.string(),
  youtube: z.string().min(1, {
    message: "It is a required field!"
  }),
  linkedin: z.string().min(1, {
    message: "It is a required field!"
  })
})
