import z from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  url: z.string().url("Invalid URL").optional().or(z.literal("")),
  createdBy: z.string().min(1, "User ID is required"),
});

export type ProjectSchemaType = z.infer<typeof projectSchema>;

export type ProjectType = ProjectSchemaType & {
  createdBy: string;
};
