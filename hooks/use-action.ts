import { ActionState, FieldErrors } from '@/lib/create-safe-action'
import { useState, useCallback } from 'react'

type Action<TInput, TOutput> = (data: TInput) => Promise<ActionState<TInput, TOutput>>

interface UseActionsOptions<TOutput> {
  onSuccess?: (data: TOutput) => void
  onError?:(error: string) => void
  onComplete?: () => void
}

export const UseAction = <TInput, TOutput> (
  action: Action<TInput, TOutput>,
  options: UseActionsOptions<TOutput> = {}
) => {
  const [fieldErrors, setFieldErros]= useState<FieldErrors<TInput> | undefined >(undefined)
  const [ error, setError] = useState<string | undefined>(undefined)
  const [data, setData] = useState<TOutput | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true)


      try {
        const result = await action(input)

        if(!result) {
          return;
        }

        setFieldErros(result.fieldErrors)

        if(result.error) {
          setError(result.error)
          options.onError?.(result.error)
        }

        if(result.data) {
          setData(result.data)
          options.onSuccess?.(result.data)
        }
      } finally {
        setIsLoading(false)
        options.onComplete?.()
      }
    }, [action, options]
  );

  return {
    execute,
    fieldErrors,
    error,
    data,
    isLoading
  }
}
