"use client";

import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface FormChecklistProps {
  id: string
  label: string
  className?: string
  checked?: boolean
  defaultChecked?: boolean
  required?: boolean;
  disabled?: boolean;
}

export function FormChecklist({ id, label, checked, defaultChecked, required, disabled }: FormChecklistProps) {
  return (
    <div className="space-y-2 w-full">
      <div className="space-y-1 w-full flex items-center gap-3">
        <Checkbox
          id={id}
          checked={checked}
          defaultChecked={defaultChecked}
          required={required}
          disabled={disabled}
        />
        <Label
          htmlFor={id}
          className="text-sm font-normal text-neutral-700"
        >
          {label}
        </Label>
      </div>
    </div>
  )
}
