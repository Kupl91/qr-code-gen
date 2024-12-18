'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Card } from "@/shared/ui/card"
import { workerSchema, WorkerFormData } from '@/entities/worker/model/types'
import { setWorkerData } from '@/entities/worker/model/slice'

interface WorkerFormProps {
  defaultValues?: Partial<WorkerFormData>
  onValuesChange?: (values: WorkerFormData) => void
}

export function WorkerForm({ defaultValues, onValuesChange }: WorkerFormProps) {
  const dispatch = useDispatch()
  
  const { register, setValue, watch } = useForm<WorkerFormData>({
    resolver: zodResolver(workerSchema),
    defaultValues: defaultValues || {
      firstname: '',
      lastname: '',
      organization: '',
      position: '',
      phoneWork: '',
      phoneMobile: '',
      email: '',
      website: ''
    }
  })

  useEffect(() => {
    const subscription = watch((value) => {
      onValuesChange?.(value as WorkerFormData)
      dispatch(setWorkerData(value as WorkerFormData))
    })
    return () => subscription.unsubscribe()
  }, [watch, dispatch, onValuesChange])

  return (
    <Card className="flex-1">
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="firstname">Имя</Label>
            <Input id="firstname" {...register('firstname')} />
          </div>
          {/* Остальные поля формы */}
        </div>
      </div>
    </Card>
  )
} 