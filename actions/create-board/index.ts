'use server';

import { z } from 'zod'
import { db } from "@/lib/db";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { InputType, ReturnType } from './types';
import { auth } from '@clerk/nextjs';
import { createSafeAction } from '@/lib/create-safe-action';
import { CreateBoard } from './schema';
import { createAuditLog } from '@/lib/create-audit-log';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import { hasAvailableCount, incrementAvailableCount } from '@/lib/org-limit';
import { checkSubscription } from '@/lib/subscription';


const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId} = auth()

  if(!userId || !orgId) {
    return {
      error: 'Unauthorized'
    }
  }

  const canCreateBoard = await hasAvailableCount()
  const isPro = await checkSubscription()

  if(!canCreateBoard && !isPro) {
    return {
      error: 'You have reached your limit of free board. Please upgrade to create more.'
    }
  }

  const { title, image } = data

  const [
    imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName
  ] = image.split('|');


  if(!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName){
    return {
      error: "Missing fields. Failed to create board."
    }
  }

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName
      }
    });

    if(!isPro) {
      await incrementAvailableCount()
    }

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE
     })

  } catch (error) {
    return {
      error: 'Failed to create.'
    }
  }

  revalidatePath(`/board/${board.id}`)
  return {
    data: board
  }
}

export const createBoard = createSafeAction(CreateBoard, handler)
