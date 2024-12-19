'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Card } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { WorkerDTO, workerSchema } from '@/entities/worker'
import type { WorkerFormProps } from '../../api/types'

export function WorkerForm({ defaultValues, onValuesChange, onSave, onCancel }: WorkerFormProps) {
  const form = useForm<WorkerDTO>({
    resolver: zodResolver(workerSchema),
    defaultValues
  })

  useEffect(() => {
    if (onValuesChange) {
      const subscription = form.watch((value) => {
        onValuesChange(value as WorkerDTO)
      })
      return () => subscription.unsubscribe()
    }
  }, [form, onValuesChange])

  return (
    <Card className="w-full max-w-md p-6">
      <form onSubmit={form.handleSubmit(onSave)}>
        <div className="space-y-4">
          <div className="space-y-5">
            <div className="space-y-[2px]">
              <Label htmlFor="firstname">Имя</Label>
              <Input id="firstname" {...form.register('firstname')} />
            </div>
            <div className="space-y-[2px]">
              <Label htmlFor="lastname">Фамилия</Label>
              <Input id="lastname" {...form.register('lastname')} />
            </div>
            <div>
              <Label htmlFor="organization">Организация</Label>
              <Input id="organization" {...form.register('organization')} />
            </div>
            <div>
              <Label htmlFor="position">Должность</Label>
              <Input id="position" {...form.register('position')} />
            </div>
            <div>
              <Label htmlFor="phoneWork">Рабочий телефон</Label>
              <Input id="phoneWork" {...form.register('phoneWork')} />
            </div>
            <div>
              <Label htmlFor="phoneMobile">Мобильный телефон</Label>
              <Input id="phoneMobile" {...form.register('phoneMobile')} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                {...form.register('email')} 
              />
            </div>
            <div>
              <Label htmlFor="website">Веб-сайт</Label>
              <Input id="website" {...form.register('website')} />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={onCancel}>
            Отмена
          </Button>
          <Button type="submit">
            Сохранить
          </Button>
        </div>
      </form>
    </Card>
  )
} 