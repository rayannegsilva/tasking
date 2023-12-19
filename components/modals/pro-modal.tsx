'use client'

import { useProModel } from "@/hooks/use-pro-model"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { UseAction } from "@/hooks/use-action"

import { toast } from "sonner"
import { stripeRedirect } from "@/actions/stripe-redirect"
export function ProModal() {
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
    execute({})
  }

  return (
    <Dialog
      open={proModal.isOpen}
      onOpenChange={proModal.onClose}
    >
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image
            src='/hero.svg'
            alt="Hero"
            className="object-cover"
            fill
          />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="text-semibold text-xl">Upgrade to Tasking Pro today</h2>
          <p className="text-xs font-semibold text-neutral-600">Explore the best of Tasking</p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin ad security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button
            disabled={isLoading}
            onClick={onClick}
            className="w-full"
            variant='primary'
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
