'use client'

import { updateCheckItems } from "@/actions/update-checkitems"
import { FormCheckbox } from "@/components/form/form-check"
import { UseAction } from "@/hooks/use-action"
import { cn } from "@/lib/utils"
import { Checkitems } from "@prisma/client"
import { useParams } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

interface ChecklistItemsListProps {
  data: Checkitems
  checklistId: string
}

export function ChecklistItemsList({ data, checklistId }: ChecklistItemsListProps) {
  const params = useParams()

  const [checked, isChecked] = useState(data.isCheck)
  console.log(checked)

  const { execute } = UseAction(updateCheckItems, {
    onSuccess: (data) => {

    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const onSuccess = (newChecked: boolean) => {
      const boardId =  params.boardId as string

    execute({
      id: data.id, boardId, checklistId, isCheck: newChecked
    })
  }


  const onCheck = () => {
    const newChecked = !checked;
    isChecked(newChecked);
    onSuccess(newChecked)
  }

  return (
   <div className="flex items-center gap-3">
    <form className="flex items-center gap-3">
      <FormCheckbox
        id={data.id}
        defaultChecked={checked}
        onCheckedChange={onCheck}
        checked={checked}
      />

      <p className={cn(
        'text-sm',
        checked ? 'line-through text-zinc-500' : ''
        )}>{data.text}</p>
    </form>
   </div>
  )
}
