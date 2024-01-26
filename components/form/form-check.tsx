'use client'

import { cn } from "@/lib/utils"
import { Checkbox } from "../ui/checkbox"
import { useState } from "react"
import { useFormStatus } from "react-dom"

interface FormCheckboxProps {
  id: string
  checked?: boolean
  defaultChecked?: boolean
  required?: boolean;
  disabled?: boolean;
  onCheckedChange: () => void
  className?: string
  isChecked?: boolean
}

export function FormCheckbox({ id, checked, defaultChecked, required, disabled, onCheckedChange, className}: FormCheckboxProps) {
  const { pending } = useFormStatus()
  const [isChecked, setIsChecked] = useState(checked)

  const onCheck = () => {

  }

  
  return (
    <Checkbox
      id={id}
      checked={checked}
      defaultChecked={defaultChecked}
      required={required}
      disabled={pending || disabled}
      onCheckedChange={onCheckedChange}
      className={className}
    />
  )
}
