import * as z from "zod";

export const NoteCreateSchema = z.object({
  title: z
    .string()
    .min(1, "Note Title Must Be Atleast 1 Character")
    .max(200, "Title Too Long."),
  content: z
    .string()
    .min(1, "Note Content Must Be Atleast 1 Character")
    .max(5000, "Content Too Long."),
  publish: z.boolean(),
});

export type NoteCreatePayLoad = z.infer<typeof NoteCreateSchema>;
