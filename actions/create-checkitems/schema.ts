import { z } from 'zod'

export const CreateChecklistItems = z.object({
  text: z.string({
    required_error: 'Title is missing',
    invalid_type_error: 'Title is required'
  }).min(3, {
    message: 'Title is too short'
  }),
  checklistId: z.string(),
  boardId: z.string(),
})
