import { z } from "https://cdn.jsdelivr.net/npm/zod@3/+esm";

export const userInfoSchema = z.object({
  // Auth providers may use opaque IDs rather than UUIDs.
  id: z.string().trim().min(1), 
  name: z.string(),
  email: z.string().email(), 
});

export const formSchema = z.object({
  name: z.string(),
  id: z.string().uuid(),
  active: z.boolean(),
});

export const questionSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  type: z.enum(["short", "paragraph","date","checkbox"]),
  required: z.boolean(),
});

// LLM output may omit fields that the saved editor question requires.
export const llmQuestionSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().nullable().optional(),
  type: z.string().optional(),
  required: z.union([z.boolean(), z.string()]).optional(),
}).passthrough();

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
