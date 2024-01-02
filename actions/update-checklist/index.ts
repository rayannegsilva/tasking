'use server'

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateChecklist } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { boardId, id, title } = data
  let checklist

  try {

    checklist = await db.checklist.update({
      where: {
        id,
        card: {
          list: {
            board: {
              orgId
            }
          }
        }
      },
      data: {
        title
      }
    })

    revalidatePath(`/board/${boardId}`);
    return { data: checklist };

  } catch (error) {
    return {
      error: "Falha ao tentar alterar o Checklist"
    }
  }
}

export const updateChecklist = createSafeAction(UpdateChecklist, handler);
