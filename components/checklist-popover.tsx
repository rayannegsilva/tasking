'use client'

import { createChecklist } from '@/actions/create-checklist'
import { FormInput } from '@/components/form/form-input'
import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { UseAction } from '@/hooks/use-action'
import { CardWithList } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import { CheckSquare, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'

interface ChecklistPopoverProps {
  side?: 'left' | 'right' | 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  data: CardWithList
}

export function ChecklistPopover({ side, align, sideOffset, data }: ChecklistPopoverProps) {
  const closeRef = useRef<ElementRef<'button'>>(null)
  const params = useParams()
  const queryClient = useQueryClient()

  const { execute, isLoading } = UseAction(createChecklist, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['card', data.cardId]
      })

      toast.success(`Foi criado a checklist "${data.title}" com sucesso`)
      closeRef.current?.click()
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const onSubmit = async (formData: FormData) => {
    const title = formData.get('title') as string
    const boardId = params.boardId as string

    await execute({ title, boardId, cardId: data.id })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"inline"} variant="gray" className="w-full justify-start">
          <CheckSquare className="text-neutral-700 h-4 w-4 mr-2"/>
          Checklist
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        className='w-80 pt-13'
        side={side}
        sideOffset={sideOffset}
      >
        <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
          Criar Checklist
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
            variant={'ghost'}
          >
            <X className='h-4 w-4'/>
          </Button>
        </PopoverClose>
        <form
          action={onSubmit}
        >
          <div>
            <FormInput
              id='title'
              label='Título'
              type='text'
            />
          </div>
          <FormSubmit className='w-full mt-2' disabled={isLoading}>
            Criar
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}
