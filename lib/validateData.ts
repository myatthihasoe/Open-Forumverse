import { ZodError, ZodObject } from "zod";

const validateData = <T extends ZodObject>(
  data: unknown,
  schema: T, // Use AnyZodObject instead of ZodSchema
  partial: boolean = false
) => {
  // If partial is true, we cast/call partial on the object schema
  const validatedData = partial
    ? schema.partial().safeParse(data)
    : schema.safeParse(data);

  if (!validatedData.success) {
    throw new ZodError(validatedData.error.issues);
  }

  return validatedData;
};

export default validateData;
