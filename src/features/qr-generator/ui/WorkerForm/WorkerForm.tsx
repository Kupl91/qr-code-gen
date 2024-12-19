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
import { cn } from "@/shared/lib/utils"

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
    <Card className="w-full p-8 relative sm:max-w-[320px] md:max-w-[400px] lg:max-w-[480px]">
      <Button 
        variant="ghost" 
        onClick={onCancel}
        className={cn(
          "absolute top-6 left-6 p-0 hover:bg-transparent",
          "text-[rgb(72,85,203)] hover:text-[rgb(72,85,203)]",
          "flex items-center gap-2"
        )}
      >
        <ArrowLeft className="w-4 h-4 stroke-[rgb(72,85,203)]" />
        <span className="-ml-1">Назад</span>
      </Button>

      <form onSubmit={form.handleSubmit(onSave)} className="mt-14">
        <div className="space-y-5">
          <div className="space-y-[2px]">
            <Label 
              htmlFor="firstname"
              className="text-[12px] leading-[16px] font-medium text-label-text"
            >
              Имя
            </Label>
            <Input 
              id="firstname"
              className="text-[16px] leading-[20px] font-normal text-input-text"
              {...form.register('firstname')} 
            />
          </div>
          <div className="space-y-[2px]">
            <Label 
              htmlFor="lastname"
              className="text-[12px] leading-[16px] font-medium text-label-text"
            >
              Фамилия
            </Label>
            <Input 
              id="lastname"
              className="text-[16px] leading-[20px] font-normal text-input-text"
              {...form.register('lastname')} 
            />
          </div>
          <div className="space-y-[2px]">
            <Label 
              htmlFor="organization"
              className="text-[12px] leading-[16px] font-medium text-label-text"
            >
              Организация
            </Label>
            <Input 
              id="organization"
              className="text-[16px] leading-[20px] font-normal text-input-text"
              {...form.register('organization')} 
            />
          </div>
          <div className="space-y-[2px]">
            <Label 
              htmlFor="position"
              className="text-[12px] leading-[16px] font-medium text-label-text"
            >
              Должность
            </Label>
            <Input 
              id="position"
              className="text-[16px] leading-[20px] font-normal text-input-text"
              {...form.register('position')} 
            />
          </div>
          <div className="space-y-[2px]">
            <Label 
              htmlFor="phoneWork"
              className="text-[12px] leading-[16px] font-medium text-label-text"
            >
              Рабочий телефон
            </Label>
            <Input 
              id="phoneWork"
              className="text-[16px] leading-[20px] font-normal text-input-text"
              {...form.register('phoneWork')} 
            />
          </div>
          <div className="space-y-[2px]">
            <Label 
              htmlFor="phoneMobile"
              className="text-[12px] leading-[16px] font-medium text-label-text"
            >
              Мобильный телефон
            </Label>
            <Input 
              id="phoneMobile"
              className="text-[16px] leading-[20px] font-normal text-input-text"
              {...form.register('phoneMobile')} 
            />
          </div>
          <div className="space-y-[2px]">
            <Label 
              htmlFor="email"
              className="text-[12px] leading-[16px] font-medium text-label-text"
            >
              Email
            </Label>
            <Input 
              id="email"
              className="text-[16px] leading-[20px] font-normal text-input-text"
              type="email"
              {...form.register('email')} 
            />
          </div>
          <div className="space-y-[2px]">
            <Label 
              htmlFor="website"
              className="text-[12px] leading-[16px] font-medium text-label-text"
            >
              Веб-сайт
            </Label>
            <Input 
              id="website"
              className="text-[16px] leading-[20px] font-normal text-input-text"
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