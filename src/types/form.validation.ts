import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  number: z
    .string()
    .length(10, "Number must be exactly 10 digits")
    .regex(/^\d+$/, "Number must contain only digits"),
  email: z.string().email("Invalid email format"),
  message: z
    .string()
    .max(900, "Message cannot exceed 150 words"),
}).strict();