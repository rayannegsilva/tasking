"use client";

import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface FormChecklistProps {
  id: string
  label: string
  className?: string
  checked?: boolean
}

export function FormChecklistText({ id, label, checked, }: FormChecklistProps) {
  // const [isEditing, setIsEditing] = useState(false) 

  return (
    <div className="space-y-2 w-full">
      <div className="space-y-1 w-full flex items-center gap-3">
       
        <p
          // htmlFor={id}
          className="text-sm font-normal text-neutral-700"
        >
          {label}
        </p>
      </div>
    </div>
  )
}
