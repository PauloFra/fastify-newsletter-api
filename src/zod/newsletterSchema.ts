import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, { message: "Name must not be empty" }),
  email: z.string().email({ message: "Invalid email format" }),
});

export const newsletterSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name must not be empty" }),
  email: z.string().email({ message: "Invalid email format" }),
});

export const getAllSubsSchema = z.array(newsletterSchema);
