'use client'

import { deleteChecklist } from "@/actions/delete-checklist"
import { updateChecklist } from "@/actions/update-checklist"
import { FormInput } from "@/components/form/form-input"
import { Button } from "@/components/ui/button"
import { UseAction } from "@/hooks/use-action"
import { Checklist } from "@prisma/client"
import { useQueryClient } from "@tanstack/react-query"
import { CheckSquare } from "lucide-react"
import { useParams } from "next/navigation"


import { ElementRef, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

interface ChecklistFormTitleProps {
  data: Checklist
  cardId: string
}

export function ChecklistFormTitle ({ data, cardId }: ChecklistFormTitleProps) {
  const queryClient = useQueryClient()
  const params = useParams()

  const [title, setTitle] = useState(data.title)
  const [isEditing, setIsEditing] = useState(false)

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  useEffect(() => {
    setTitle(data.title);
  }, [data.title]);

  const { execute } = UseAction(updateChecklist, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.cardId],
      })

      toast.success(`Board "${data.title}" updated!`)
      setTitle(data.title)
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const { execute: executeDelete, isLoading: isLoadingDelete } = UseAction(deleteChecklist, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", cardId],
      })

      toast.success(`A checklist ${data.title} foi deletada com sucesso.`)
    }
  })

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  const onSubmit = async (formData: FormData) => {
    const title  = formData.get('title') as string
    const boardId = params.boardId as string

    if(title === data.title) {
      return;
    }

    await execute({ title, id: data.id, boardId })
  }

  const onDelete = () => {
    const boardId = params.boardId as string

    executeDelete({
      id: data.id,
      boardId
    })
  }
  return (
    <div className="flex items-center space-x-3">
      <CheckSquare className="w-5 h-5 mt-0.5 text-zinc-700"/>
      <div className="w-full">
        <form action={onSubmit}>
        <FormInput
           ref={inputRef}
           id='title'
           onBlur={onBlur}
           defaultValue={title}
           className="font-semibold text-md text-zinc-800 px-1 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white  focus-visible:border-input"
               />
        </form>
      </div>
      <Button
        size={"sm"}
        variant={"gray"}
        onClick={onDelete}
        disabled={isLoadingDelete}
      >
        Excluir
      </Button>
    </div>
  )
}
