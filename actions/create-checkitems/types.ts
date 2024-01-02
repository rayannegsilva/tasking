import { z } from 'zod'
import {
  Checkitems,
 } from '@prisma/client'
import { ActionState } from '@/lib/create-safe-action'
import { CreateChecklistItems } from './schema'

export type InputType = z.infer<typeof CreateChecklistItems>
export type ReturnType = ActionState<InputType, Checkitems>
