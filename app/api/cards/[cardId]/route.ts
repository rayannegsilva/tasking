import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: {params: { cardId: string}}) {
  try {
    const { userId, orgId} = auth()

    if(!userId || !orgId) {
      return new NextResponse("Unauthorize", { status: 401 })
    }

    const card = await db.card.findUnique({
      where: {
        id: params.cardId,
        list: {
          board: {
            orgId
          }
        }
      },
      include:{
        list: {
          select: {
            title: true
          }
        },
        checklist: {
          select: {
            id: true,
            checkitems: true,
            title: true,
          }
        }
      },
    })

    return  NextResponse.json(card)
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}
