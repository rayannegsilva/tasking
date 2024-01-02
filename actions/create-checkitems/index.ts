'use server'

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateChecklistItems } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { text, checklistId, boardId } = data
  let checkitem

  try {
    const checklist = await db.checklist.findUnique({
      where: {
        id: checklistId,
        card: {
          list: {
            board: {
              orgId
            }
          }
        }
      }
    })


    if(!checklist) {
      return {
        error: 'Card not found'
      }
    }

    checkitem = await db.checkitems.create({
      data: {
        text,
        checklistId
      }
    })

    revalidatePath(`/board/${boardId}`);
    return { data: checkitem };

  } catch (error) {
    return {
      error: "Falha ao tentar criar a Checklist"
    }
  }
}

export const createCheckitem = createSafeAction(CreateChecklistItems, handler);
