'use client'

import { copyCard } from "@/actions/copy-card"
import { deleteCard } from "@/actions/delete-card"
import { ChecklistPopover } from "@/components/checklist-popover"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { UseAction } from "@/hooks/use-action"
import { useCardModel } from "@/hooks/use-card-model"
import { CardWithList } from "@/types"
import { CheckSquare, Copy, Trash } from "lucide-react"
import { useParams } from "next/navigation"
import { toast } from "sonner"

interface ActionsProps {
  data: CardWithList
}

export function Actions({ data } : ActionsProps) {
  const params = useParams()
  const cardModal = useCardModel()

  const { execute: deleteCardExecute, isLoading: isLoadingCopy } = UseAction(deleteCard, {
    onSuccess: () => {
      toast.success('Card deleted.')
      cardModal.onClose()
    },
    onError: (error) => {
      toast.error(error)
    }
  })


  const { execute: copyCardExecute, isLoading: isLoadingDelete} = UseAction(copyCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" copied`);
      cardModal.onClose()
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const onCopy = () => {
    const boardId = params.boardId as string

    copyCardExecute({
      id: data.id,
      boardId
    })
  }

  const onDelete = () => {
    const boardId = params.boardId as string

    deleteCardExecute({
      id: data.id,
      boardId
    })
  }

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">
        Ações do cartão
      </p>
      <ChecklistPopover
        data={data}
        side="bottom"
        sideOffset={10}
        />
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant="gray"
        className="w-full justify-start"
        size={"inline"}
      >
        <Copy className="text-neutral-700 h-4 w-4 mr-2"/>
        Copiar
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        variant="gray"
        className="w-full justify-start"
        size={"inline"}
      >
        <Trash className="text-neutral-700 h-4 w-4 mr-2"/>
         Deletar
      </Button>
    </div>
  )
}

Actions.Skeleton = function ActionSkeleton () {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200"/>
      <Skeleton className="w-full h-8 bg-neutral-200"/>
      <Skeleton className="w-full h-8 bg-neutral-200"/>
    </div>
  )
}
