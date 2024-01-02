import { z } from 'zod'
import {
  Checkitems,
 } from '@prisma/client'
import { ActionState } from '@/lib/create-safe-action'
import { UpdateChecklistItems } from './schema'

export type InputType = z.infer<typeof UpdateChecklistItems>
export type ReturnType = ActionState<InputType, Checkitems>
