import z from "zod";

const GetAnswerSchema = z.object({
  questionId: z.string(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  filter: z.string(),
});
export default GetAnswerSchema;
