import { z } from "zod";

export const PostFeedbackRequestBody = z.object({
  message: z.string().max(1000),
});
