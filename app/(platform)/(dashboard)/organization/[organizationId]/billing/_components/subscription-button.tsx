'use client'

import { stripeRedirect } from "@/actions/stripe-redirect"
import { Button } from "@/components/ui/button"
import { UseAction } from "@/hooks/use-action"
import { useProModel } from "@/hooks/use-pro-model"
import { toast } from "sonner"

interface SubscriptionButtonProps {
  isPro: boolean
}

export function SubscriptionButton ({ isPro }: SubscriptionButtonProps) {

  const proModal = useProModel()

  const { execute, isLoading } = UseAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const onClick = () => {
    if(isPro) {
      execute({})
    } else {
      proModal.onOpen()
    }
  }

  return (
    <Button
      onClick={onClick}
      variant={"primary"}
      disabled={isLoading}
    >
      { isPro ? "Manage subscription" : "Upgrade to pro"}
    </Button>
  )
}
