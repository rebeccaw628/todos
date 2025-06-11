import * as z from "zod";

export const schema = z.object({
  type: z.string().trim().min(1, "Category type is required"),
});

export type CategoryFormData = z.infer<typeof schema>;
