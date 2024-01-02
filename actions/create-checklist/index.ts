'use server'

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateChecklist } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, cardId, boardId } = data
  let checklist

  try {
    const card = await db.card.findUnique({
      where: {
        id: cardId,
        list: {
          board: {
            orgId
          }
        }
      }
    })

    if(!card) {
      return {
        error: 'Card not found'
      }
    }

    checklist = await db.checklist.create({
      data: {
        title,
        cardId
      }
    })

    revalidatePath(`/board/${boardId}`);
    return { data: checklist };

  } catch (error) {
    return {
      error: "Falha ao tentar criar a Checklist"
    }
  }
}

export const createChecklist = createSafeAction(CreateChecklist, handler);
