'use client'

import { Checkitems, Checklist } from "@prisma/client"
import { ChecklistFormTitle } from "./checklist-title-form"
import { Skeleton } from "@/components/ui/skeleton"
import { ChecklistItemsForm } from "./checklist-items-form"
import { ChecklistWithItems } from "@/types"
import { ElementRef, useRef, useState } from "react"
import { ChecklistItemsList } from "./checklist-items-list"

interface ChecklistProps {
  data: ChecklistWithItems[] | undefined
  cardId: string
}

export function ChecklistForm ({ data, cardId }: ChecklistProps) {
  const inputRef = useRef<ElementRef<'input'>>(null)

  const [isEditing, setIsEditing] = useState(false)

  const disableEditing = (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
    e?.preventDefault();
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
    })
  }


  if (!data || data.length === 0) {
    return null;
  }

  return (
  <>
    {data.map((checklist) => (
      <div
        key={checklist.id}
        className="w-full flex-col gap-3"
      >
        <ChecklistFormTitle
          data={checklist}
          cardId={cardId}
        />

      <div className="my-4">
        {checklist.checkitems.map((item) => (
          <ChecklistItemsList
            cardId={cardId}
            key={item.id}
            data={item}
            checklistId={checklist.id}
          />
        ))}
        </div>
        <div className="w-full">
          <ChecklistItemsForm
            checklistId={checklist.id}
            disableEditing={disableEditing}
            enableEditing={enableEditing}
            isEditing={isEditing}
            ref={inputRef}
            cardId={checklist.cardId}
          />
        </div>
      </div>
    ))}
  </>
  )
  }



ChecklistForm.Skeleton = function ChecklistFormSkeleton () {
  return (
    <div className="flex items-start gap-x-3 w-full">
        <Skeleton className="h-6 w-6 bg-neutral-200"/>
    </div>
  )
}
