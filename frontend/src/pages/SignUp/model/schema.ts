import { z } from "zod";

const SignUpSchema = z
  .object({
    fullName: z.string().min(5).max(20),
    username: z.string().min(2).max(20),
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
    gender: z.enum(["male", "female"], {
      required_error: "Gender is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


  export default SignUpSchema;
