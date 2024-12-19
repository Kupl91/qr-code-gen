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
    <Card className="w-full p-fluid-1 relative
      sm:max-w-[320px] md:max-w-[400px] lg:max-w-[480px]">
      <Button 
        variant="ghost" 
        className="absolute top-fluid-1 left-fluid-1"
        onClick={onCancel}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад
      </Button>

      <form onSubmit={form.handleSubmit(onSave)} className="mt-fluid-2">
        <div className="space-y-fluid-1">
          <div className="space-y-2">
            <Label className="text-fluid-sm" htmlFor="firstname">
              Имя
            </Label>
            <Input 
              id="firstname"
              className="text-fluid-base"
              {...form.register('firstname')} 
            />
          </div>
          <div className="space-y-2">
            <Label className="text-fluid-sm" htmlFor="lastname">
              Фамилия
            </Label>
            <Input 
              id="lastname"
              className="text-fluid-base"
              {...form.register('lastname')} 
            />
          </div>
          <div>
            <Label className="text-fluid-sm" htmlFor="organization">
              Организация
            </Label>
            <Input 
              id="organization"
              className="text-fluid-base"
              {...form.register('organization')} 
            />
          </div>
          <div>
            <Label className="text-fluid-sm" htmlFor="position">
              Должность
            </Label>
            <Input 
              id="position"
              className="text-fluid-base"
              {...form.register('position')} 
            />
          </div>
          <div>
            <Label className="text-fluid-sm" htmlFor="phoneWork">
              Рабочий телефон
            </Label>
            <Input 
              id="phoneWork"
              className="text-fluid-base"
              {...form.register('phoneWork')} 
            />
          </div>
          <div>
            <Label className="text-fluid-sm" htmlFor="phoneMobile">
              Мобильный телефон
            </Label>
            <Input 
              id="phoneMobile"
              className="text-fluid-base"
              {...form.register('phoneMobile')} 
            />
          </div>
          <div>
            <Label className="text-fluid-sm" htmlFor="email">
              Email
            </Label>
            <Input 
              id="email"
              className="text-fluid-base"
              type="email"
              {...form.register('email')} 
            />
          </div>
          <div>
            <Label className="text-fluid-sm" htmlFor="website">
              Веб-сайт
            </Label>
            <Input 
              id="website"
              className="text-fluid-base"
              {...form.register('website')} 
            />
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