/**
 * Компонент формы редактирования данных работника
 * 
 * Использует React Hook Form для управления формой и Zod для валидации.
 * Интегрируется с Redux для сохранения данных.
 * 
 * @module features/qr-generator/ui/WorkerForm
 */

'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Card } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { ArrowLeft } from "lucide-react"
import { WorkerDTO, workerSchema, workerActions } from '@/entities/worker'
import type { WorkerFormProps } from '../../api/types'
import { cn } from "@/shared/lib/utils"
import { useAppDispatch } from '@/shared/lib/hooks/redux'

/**
 * Компонент WorkerForm
 * 
 * @component
 * @param {WorkerFormProps} props - Пропсы компонента
 * @example
 * return (
 *   <WorkerForm
 *     defaultValues={initialData}
 *     onSave={handleSave}
 *     onCancel={handleCancel}
 *   />
 * )
 */
export function WorkerForm({ defaultValues, onSave, onCancel }: WorkerFormProps) {
  const dispatch = useAppDispatch()
  const form = useForm<WorkerDTO>({
    resolver: zodResolver(workerSchema),
    defaultValues
  })

  const handleFormChange = form.watch((data) => {
    if (data) {
      dispatch(workerActions.setWorkerData(data as WorkerDTO))
    }
  })

  useEffect(() => {
    const subscription = handleFormChange
    return () => subscription.unsubscribe()
  }, [handleFormChange])

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
            {form.formState.errors.firstname && (
              <span className="text-destructive text-sm">
                {form.formState.errors.firstname.message}
              </span>
            )}
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
            {form.formState.errors.lastname && (
              <span className="text-destructive text-sm">
                {form.formState.errors.lastname.message}
              </span>
            )}
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
            {form.formState.errors.organization && (
              <span className="text-destructive text-sm">
                {form.formState.errors.organization.message}
              </span>
            )}
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
            {form.formState.errors.position && (
              <span className="text-destructive text-sm">
                {form.formState.errors.position.message}
              </span>
            )}
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
            {form.formState.errors.phoneWork && (
              <span className="text-destructive text-sm">
                {form.formState.errors.phoneWork.message}
              </span>
            )}
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
            {form.formState.errors.phoneMobile && (
              <span className="text-destructive text-sm">
                {form.formState.errors.phoneMobile.message}
              </span>
            )}
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
            {form.formState.errors.email && (
              <span className="text-destructive text-sm">
                {form.formState.errors.email.message}
              </span>
            )}
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
            {form.formState.errors.website && (
              <span className="text-destructive text-sm">
                {form.formState.errors.website.message}
              </span>
            )}
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