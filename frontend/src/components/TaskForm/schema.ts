import * as z from "zod";

const current = new Date();
const currentDate = new Date(current.toDateString());

export const schema = z.object({
  description: z.string().min(3, "Task description is required"),
  category: z.string().min(3, "Category is required"),
  dueDate: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        else {
          const date = new Date(val);
          return date >= currentDate;
        }
      },
      {
        message: "Due date cannot be before today",
      }
    ),
});

export type TaskFormData = z.infer<typeof schema>;
