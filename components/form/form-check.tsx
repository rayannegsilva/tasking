'use client'

import { cn } from "@/lib/utils"
import { Checkbox } from "../ui/checkbox"

interface FormCheckboxProps {
  id: string
  checked?: boolean
  defaultChecked?: boolean
  required?: boolean;
  disabled?: boolean;
  onCheckedChange: () => void
}

export function FormCheckbox({ id, checked, defaultChecked, required, disabled, onCheckedChange}: FormCheckboxProps) {
  return (
    <Checkbox
      id={id}
      checked={checked}
      defaultChecked={defaultChecked}
      required={required}
      disabled={disabled}
      onCheckedChange={onCheckedChange}
    />
  )
}
