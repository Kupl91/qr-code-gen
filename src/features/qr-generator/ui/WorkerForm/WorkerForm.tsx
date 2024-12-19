'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Card } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { ArrowLeft } from "lucide-react"
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
    <Card className="w-full max-w-md p-6 relative">
      <Button 
        variant="ghost" 
        className="absolute top-4 left-4 text-[rgb(72,85,203)] hover:bg-transparent hover:text-[rgb(72,85,203)]"
        onClick={onCancel}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад
      </Button>
      <form onSubmit={form.handleSubmit(onSave)}>
        <div className="space-y-4 mt-8">
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
        <div className="flex justify-end mt-6">
          <Button type="submit">
            Сохранить
          </Button>
        </div>
      </form>
    </Card>
  )
} 