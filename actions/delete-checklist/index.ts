'use server'

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteChecklist } from "./schema"
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;
  let checklist;

  try {
    checklist = await db.checklist.delete({
      where: {
        id,
        card: {
          list: {
            board: {
              orgId
            }
          }
        }
      }
    })

    // await createAuditLog({
    //   entityId: card.id,
    //   entityTitle: card.title,
    //   entityType: ENTITY_TYPE.BOARD,
    //   action: ACTION.DELETE
    //  })

  } catch (error) {
    return {
      error: "Failed to delete."
    }
  }

  revalidatePath(`/board/${boardId}`);
  return{data: checklist}
}

export const deleteChecklist = createSafeAction(DeleteChecklist, handler);
