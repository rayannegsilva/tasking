'use client'

import { createCheckitem } from "@/actions/create-checkitems"
import { FormInput } from "@/components/form/form-input"
import { FormSubmit } from "@/components/form/form-submit"
import { Button } from "@/components/ui/button"
import { UseAction } from "@/hooks/use-action"
import { useQueryClient } from "@tanstack/react-query"
import { X } from "lucide-react"
import { useParams } from "next/navigation"
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react"
import { toast } from "sonner"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

interface ChecklistItemsFormProps {
  checklistId: string
  enableEditing: () => void
  disableEditing: (e?: React.MouseEvent<HTMLButtonElement> | any) =>  void
  isEditing: boolean
  cardId: string
}

export const ChecklistItemsForm = forwardRef<HTMLInputElement,ChecklistItemsFormProps>((
  { isEditing, enableEditing, disableEditing, checklistId, cardId }, ref) => {
    const queryClient = useQueryClient()

    const formRef = useRef<ElementRef<'form'>>(null)
    const params = useParams();

    const { execute, fieldErrors } = UseAction(createCheckitem, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["card", cardId],
        })
        toast.success(`A checklist ${data.text} foi deletada com sucesso.`)
      },
      onError: (error) => {
        toast.error(error)
      }
    })

    const onKeyDown = (e: KeyboardEvent, ev?: React.MouseEvent<HTMLButtonElement>) => {
      if(e.key === 'Escape') {
        e.preventDefault();
        // disableEditing(ev)
      }
    }

    const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
      if(e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit()
      }
    }

    const onBlur = () => {
      formRef.current?.requestSubmit()
    }

    useOnClickOutside(formRef, disableEditing)
    useEventListener('keydown', onKeyDown)

    const onSubmit = (formData: FormData) => {
      const text  = formData.get('text') as string
      const boardId = formData.get('boardId') as string
      const checklistId = formData.get('checklistId') as string

      execute({
        text, boardId, checklistId
      })
    }

    if(isEditing) {
      return (
        <form className="mt-3" action={onSubmit}>
          <FormInput
            id="text"
            onBlur={onBlur}
            ref={ref}
            onKeyDown={onInputKeyDown}
            placeholder="Adicionar item"
            errors={fieldErrors}
          />
          <input hidden id='listId' name='checklistId' value={checklistId}/>
          <input hidden id='boardId' name='boardId' value={params.boardId}/>
          <div className="flex items-center gap-x-1 mt-3">
            <FormSubmit>
              Adicionar
            </FormSubmit>
            <Button onClick={(e) => disableEditing(e)} variant={"ghost"} size='sm'>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </form>
      )
    }

    return (
      <div className="mt-3">
        <Button
          onClick={enableEditing}
          size='sm'
          variant='gray'
        >
            Adicionar item
        </Button>
      </div>
  )
})


ChecklistItemsForm.displayName = 'ChecklistItemsForm'



//  export function ChecklistItemsForm({ isEditing }: ChecklistItemsForm) {
//   const params = useParams();


//   const formRef = useRef<ElementRef<'form'>>(null)

//   if(isEditing) {
//     return (
//       <form action="" className="m-1 py-0.5 px-1 space-y-4">
//         <FormInput
//           id='checkItem'
//           placeholder="Adicionar item"
//         />
//         <div>
//           <FormSubmit>
//             Adicionar
//           </FormSubmit>
//           <Button variant={"ghost"}>
//             <X className="w-5 h-5" />
//           </Button>
//         </div>
//       </form>
//     )
//   }

//   return (
//     <div className="">
//       <Button
//         size='sm'
//         variant='gray'
//         className=''
//       >
//         Adicionar item
//       </Button>
//     </div>
//   )
// }
