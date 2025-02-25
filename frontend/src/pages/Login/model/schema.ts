import { z } from "zod";

const FormLoginSchema = z.object({
  username: z.string().min(2).max(20),
  password: z.string().min(5),
});


  export default FormLoginSchema;
