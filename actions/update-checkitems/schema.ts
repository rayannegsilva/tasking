import { z } from 'zod'

export const UpdateChecklistItems = z.object({
  id: z.string(),
  boardId: z.string(),
  checklistId: z.string(),
  text: z.optional(
    z.string({
      required_error: 'Title is missing',
      invalid_type_error: 'Title is required'
    }).min(0, {
      message: 'Description is too short'
    })
  ),
  isCheck: z.optional(
    z.boolean()
  )
})
