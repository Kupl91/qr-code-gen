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
import { Button } from "@/shared/ui/button"

interface WorkerFormProps {
  defaultValues?: Partial<WorkerFormData>
  onValuesChange?: (values: WorkerFormData) => void
  onSave: (data: WorkerFormData) => void
  onCancel: () => void
}

export function WorkerForm({ defaultValues, onValuesChange, onSave, onCancel }: WorkerFormProps) {
  const dispatch = useDispatch()
  
  const { register, setValue, watch, handleSubmit, formState: { isDirty } } = useForm<WorkerFormData>({
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

  const onSubmit = handleSubmit((data) => {
    onSave(data)
  })

  return (
    <Card className="flex-1">
      <form onSubmit={onSubmit}>
        <div className="p-8 space-y-8">
          <div className="space-y-5">
            <div className="space-y-[2px]">
              <Label htmlFor="firstname">Имя</Label>
              <Input id="firstname" {...register('firstname')} />
            </div>
            <div className="space-y-[2px]">
              <Label htmlFor="lastname">Фамилия</Label>
              <Input id="lastname" {...register('lastname')} />
            </div>
            <div>
              <Label htmlFor="organization">Организация</Label>
              <Input id="organization" {...register('organization')} />
            </div>
            <div>
              <Label htmlFor="position">Должность</Label>
              <Input id="position" {...register('position')} />
            </div>
            <div>
              <Label htmlFor="phoneWork">Рабочий телефон</Label>
              <Input id="phoneWork" {...register('phoneWork')} />
            </div>
            <div>
              <Label htmlFor="phoneMobile">Мобильный телефон</Label>
              <Input id="phoneMobile" {...register('phoneMobile')} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                {...register('email')} 
              />
            </div>
            <div>
              <Label htmlFor="website">Веб-сайт</Label>
              <Input id="website" {...register('website')} />
            </div>
          </div>
          <div className="flex gap-4">
            {isDirty ? (
              <Button 
                type="submit" 
                className="flex-1"
              >
                Сохранить
              </Button>
            ) : (
              <Button 
                type="button" 
                onClick={onCancel}
                className="flex-1"
              >
                Вернуться
              </Button>
            )}
          </div>
        </div>
      </form>
    </Card>
  )
} 