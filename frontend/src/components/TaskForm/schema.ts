import * as z from "zod";

export const schema = z.object({
  description: z.string().min(3, "Task description is required"),
  category: z.string().min(3, "Category is required"),
  dueDate: z.string().optional(),
});

export type TaskFormData = z.infer<typeof schema>;
