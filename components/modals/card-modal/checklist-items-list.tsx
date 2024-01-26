'use client'

import { updateCheckItems } from "@/actions/update-checkitems"
import { FormCheckbox } from "@/components/form/form-check"
import { FormInput } from "@/components/form/form-input"
import { FormSubmit } from "@/components/form/form-submit"
import { Button } from "@/components/ui/button"
import { UseAction } from "@/hooks/use-action"
import { fetcher } from "@/lib/fetcher"
import { cn } from "@/lib/utils"
import { Checkitems } from "@prisma/client"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { MoreHorizontal, X } from "lucide-react"
import { useParams } from "next/navigation"
import { ElementRef, useRef, useState } from "react"
import { toast } from "sonner"
import { useOnClickOutside } from "usehooks-ts"

interface ChecklistItemsListProps {
  data: Checkitems
  checklistId: string
  cardId: string
}

export function ChecklistItemsList({ data, checklistId, cardId }: ChecklistItemsListProps) {
  const params = useParams()
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)

  const [checked, isChecked] = useState(data.isCheck)
  const [isText, setIsText] = useState(data.text)
  
  const inputRef = useRef(null)
  const formRef = useRef<ElementRef<'form'>>(null)


  const { execute } = UseAction(updateCheckItems, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card",  cardId],
      })

      disableEditing()

      toast.info(`O item "${data.text}" foi modificado com sucesso.`)
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const onCheckChange = async (newChecked: boolean) => {
      const boardId =  params.boardId as string
        execute({
          id: data.id, boardId, checklistId, isCheck: newChecked
        })
  }

  const onCheck = () => {
    const newChecked = !checked;
    isChecked(newChecked);
    onCheckChange(newChecked)
  }

  const enableEditing = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setIsEditing(true)
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  const disableEditing = (e?:  any) => {
    e?.preventDefault()
    e?.stopPropagation()
    setIsEditing(false)
  }

  useOnClickOutside(formRef, disableEditing)

  const onSubmit = async (formData: FormData, e?: Event) => {
    e?.preventDefault()
    const text = formData.get('text') as string
    const boardId =  params.boardId as string

    setIsText(text)
    if(text === data.text) {
      return;
    }

    await execute ({ 
      id: data.id, boardId, checklistId, isCheck: checked, text: text
    })
  }

  return (
   <div className="flex items-center gap-2 w-full">
    <form className={cn(
        "flex gap-2 w-full items-center",
        isEditing ? 'items-start' : ''
        )}
        action={onSubmit}
        >
      <FormCheckbox
        id={data.id}
        defaultChecked={checked}
        onCheckedChange={onCheck}
        checked={checked}
        className={cn(
          "flex",
          isEditing ? 'mt-1' : ''
        )}
      />

     {
      isEditing 
      ? (
        <div 
          className="w-full flex  flex-col bg-zinc-200/80 rounded-md px-2 py-2" 
          >
          <FormInput 
            id='text'
            defaultValue={isText}
            ref={inputRef}
            className="text-base w-full flex shadow-none"
            onBlur={onBlur}

          />
          <div className="flex items-center gap-3">
            <FormSubmit className="mt-2">
              Salvar
            </FormSubmit>
            <Button size="sm" variant={"ghost"} className="mt-2" onClick={disableEditing}>
              <X className="w-5 h-5"/>
            </Button>
          </div>
        </div>
      ) 
      : (
        <div 
          onClick={enableEditing}
          className="flex flex-1 cursor-pointer hover:bg-zinc-200/80 rounded-md px-2 py-1 items-center justify-between group"
        >
         <p className={cn('text-base', checked ? 'line-through text-zinc-400' : '')}>{data.text}</p>
         <div className="hidden group-hover:flex">
          <button
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); console.log('clicou no botão')}}
            className="leading-0 flex items-center justify-center bg-zinc-300/90 rounded-full p-1 z-10 cursor-pointer hover:bg-zinc-300/70"
          >
            <MoreHorizontal className="w-4 h-4"/>
          </button>
         </div>
        </div>
      )
     }
    </form>
   </div>
  )
}
