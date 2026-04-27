import z, { ZodError, ZodSchema } from "zod";

const validateData = (data: unknown, schema: ZodSchema) => {
  const validatedData = schema.safeParse(data);
  if (!validatedData.success) {
    throw new ZodError(validatedData.error.issues);
  }
  return validatedData;
};

export default validateData;
