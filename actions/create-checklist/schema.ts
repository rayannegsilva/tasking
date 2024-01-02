import { z } from 'zod'

export const CreateChecklist = z.object({
  title: z.string({
    required_error: 'Title is missing',
    invalid_type_error: 'Title is required'
  }).min(3, {
    message: 'Title is too short'
  }),
  cardId: z.string(),
  boardId: z.string(),
})
