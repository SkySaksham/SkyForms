import { z } from "https://cdn.jsdelivr.net/npm/zod@3/+esm";

export const userInfoSchema = z.object({
  id: z.string().uuid(), 
  name: z.string(),
  email: z.string().email(), 
});

export const formSchema = z.object({
  name: z.string(),
  id: z.string().uuid(),
  status: z.boolean(),
});

export const questionSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  type: z.enum(["short", "paragraph","date","checkbox"]),
  required: z.boolean(),
});

export const draftFormSchema = z.object({
  version: z.number(),
  name: z.string(),
  id: z.string().uuid(),
  questions: z.array(questionSchema),
});

export const dataSchema = z.object({
  userInfo: userInfoSchema,
  yourForms: z.array(formSchema),
  drafts: z.record(z.string().uuid(), draftFormSchema),
});
