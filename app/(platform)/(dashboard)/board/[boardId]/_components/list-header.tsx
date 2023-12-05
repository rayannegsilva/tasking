'use client'

import { updateList } from "@/actions/update-list"
import { UpdateList } from "@/actions/update-list/schema"
import { FormInput } from "@/components/form/form-input"
import { UseAction } from "@/hooks/use-action"
import { List } from "@prisma/client"
import { useState, useRef, ElementRef } from "react"
import { toast } from "sonner"
import { useEventListener } from "usehooks-ts"
import { ListOptions } from "./list-options"

interface ListHeaderProps {
  data: List
}

export function ListHeader({ data }: ListHeaderProps ) {
  const [title, setTitle] = useState(data.title)
  const [isEditing, setIsEditing] = useState(false)

  const formRef = useRef<ElementRef<"form">>(null)
  const inputRef = useRef<ElementRef<"input">>(null)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  const disableEditing = () => {
    setIsEditing(false);
  }

  const { execute } = UseAction(updateList, {
    onSuccess: (data) => {
      toast.success(`List ${data.title} updated`)
      setTitle(data.title)
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const onKeyDown = (e: KeyboardEvent) => {
    if(e.key === 'Escape') {
      formRef.current?.requestSubmit()
    }
  }

  useEventListener('keydown', onKeyDown)

  const onSubmit = (formData: FormData) => {
    const title  = formData.get('title') as string
    const boardId = formData.get('boardId') as string
    const id = formData.get('id') as string

    if(title === data.title) {
      return disableEditing()
    }

    execute({ title, boardId, id})
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  return(
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
       <form
        ref={formRef}
        action={onSubmit}
        className="flex-1 px-[2px]"
       >
        <input
          hidden
          type="text"
          name="id"
          value={data.id}
        />
         <input
          hidden
          type="text"
          name="boardId"
          value={data.boardId}
        />
        <FormInput
          ref={inputRef}
          onBlur={onBlur}
          id='title'
          placeholder="Enter list title"
          defaultValue={title}
          className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
        />
        <button type="submit" hidden />
       </form>
      ): (
      <div
        onClick={enableEditing}
        className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
        {title}
      </div>
      )}
      <ListOptions
        data={data}
        onAddCard={() => {}}
      />
    </div>
  )
}
