'use client'

import { createCard } from "@/actions/create-card"
import { FormSubmit } from "@/components/form/form-submit"
import { FormTextarea } from "@/components/form/form-textarea"
import { Button } from "@/components/ui/button"
import { UseAction } from "@/hooks/use-action"
import { Plus, X } from "lucide-react"
import { forwardRef, ElementRef, KeyboardEventHandler, useRef } from "react"
import { useParams } from 'next/navigation'
import { useOnClickOutside, useEventListener } from "usehooks-ts"
import { toast } from "sonner"

interface CardFormProps {
  listId: string
  enableEditing: () => void
  disableEditing: () =>  void
  isEditing: boolean
}

export const CardForm = forwardRef<HTMLTextAreaElement,CardFormProps>(({listId, enableEditing, disableEditing, isEditing}, ref) => {
  const params = useParams();
  const formRef = useRef<ElementRef<'form'>>(null)

  const { execute, fieldErrors } = UseAction(createCard, {
    onSuccess: (data) => {
      toast.success(`Card ${data.title} created`)
      formRef.current?.reset()
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const onKeyDown = (e: KeyboardEvent) => {
    if(e.key === 'Escape') {
      disableEditing()
    }
  }

  useOnClickOutside(formRef, disableEditing)
  useEventListener('keydown', onKeyDown)

  const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit()
    }
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const listId = formData.get('listId') as string
    const boardId = formData.get('boardId') as string

    execute({title, listId, boardId})
  }


  if(isEditing) {
    return  (
      <form
        ref={formRef}
        className="m-1 py-0.5 px-1 space-y-4"
        action={onSubmit}
      >
        <FormTextarea
          id="title"
          onKeyDown={onTextareaKeyDown}
          ref={ref}
          placeholder="Digite um título para esse cartão..."
          errors={fieldErrors}
        />
        <input hidden id='listId' name='listId' value={listId}/>
        <input hidden id='boardId' name='boardId' value={params.boardId}/>
        <div className="flex items-center gap-x-1">
          <FormSubmit>
            Adicionar cartão
          </FormSubmit>
          <Button onClick={disableEditing} size='sm' variant={"ghost"}>
              <X className="w-5 h-5" />
            </Button>
        </div>
      </form>
    )
  }

  return (
    <div className="pt-2 px-2">
      <Button
        onClick={enableEditing}
        className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
        size={"sm"}
        variant={"ghost"}
      >
        <Plus className="h-4 w-4 mr-2"/>
        Adicionar cartão
      </Button>
    </div>
  )
})

CardForm.displayName = "CardForm"
