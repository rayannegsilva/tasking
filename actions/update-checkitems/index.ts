'use server'

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateChecklistItems } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, checklistId, boardId, ...values } = data
  let checkitem

  try {

    checkitem =  await db.checkitems.update({
      where: {
        id,
        checklistId,
        checklist: {
          card: {
            list: {
              board: {
                orgId
              }
            }
          }
        }
      },
      data: {
        ...values
      }
    })

    revalidatePath(`/board/${boardId}`);
    return { data: checkitem };

  } catch (error) {
    return {
      error: "Falha ao tentar atualizar o item"
    }
  }
}

export const updateCheckItems = createSafeAction(UpdateChecklistItems, handler);
