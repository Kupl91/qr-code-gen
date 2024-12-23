/**
 * Компонент формы редактирования данных работника
 * 
 * Использует React Hook Form для управления формой и Zod для валидации.
 * Интегрируется с Redux для сохранения данных.
 * 
 * @module features/qr-generator/ui/WorkerForm
 */

'use client'

import { useForm, UseFormReturn } from 'react-hook-form'
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
    <div className={cn(
      "w-full",
      "px-2",
      "mx-auto",
      "sm:px-6",
      "md:px-0",
      "md:max-w-[680px]",
    )}>
      <Button 
        onClick={onCancel}
        className={cn(
          "flex items-center",
          "mb-4",
          "h-[36px]",
          "gap-[4px]",
          "text-[12px]",
          "leading-[16px]",
          "font-fact font-medium",
          "text-[#4855CB]",
          "bg-transparent",
          "hover:bg-transparent",
          "shadow-none",
          "border-none",
          "outline-none",
        )}
      >
        <ArrowLeft className="w-4 h-4 stroke-[1.8] opacity-100" />
        <span className="opacity-0">Назад</span>
      </Button>

      <div className="flex flex-col gap-4">
        <Card className={cn(
          "w-full",
          "bg-white",
          "rounded-[8px]",
          "shadow-sm",
          "overflow-hidden"
        )}>
          <div className={cn(
            "p-6",
            "sm:p-8",
            "space-y-4"
          )}>
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
              <div className="space-y-3">
                <FormField label="Имя" name="firstname" form={form} />
                <FormField label="Фамилия" name="lastname" form={form} />
                <FormField label="Организация" name="organization" form={form} />
                <FormField label="Должность" name="position" form={form} />
                <FormField label="Рабочий телефон" name="phoneWork" form={form} />
                <FormField label="Мобильный телефон" name="phoneMobile" form={form} />
                <FormField label="Email" name="email" form={form} />
                <FormField label="Веб-сайт" name="website" form={form} />
              </div>
            </form>
          </div>
        </Card>

        <Button 
          onClick={form.handleSubmit(onSave)}
          className={cn(
            "w-full",
            "h-[44px]",
            "text-[14px]",
            "leading-[20px]",
            "font-fact font-medium",
            "bg-[#4855CB]",
            "hover:bg-[#3A45A3]",
            "text-white",
            "rounded-[8px]",
            "shadow-sm"
          )}
        >
          Сохранить
        </Button>
      </div>
    </div>
  )
}

// Выделим овторяющуюся структуру полей в отдельный компонент
interface FormFieldProps {
  label: string;
  name: keyof WorkerDTO;
  form: UseFormReturn<WorkerDTO>;
}

function FormField({ label, name, form }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-[2px] w-full">
      <Label 
        htmlFor={name}
        className="h-[16px] font-fact font-medium text-[12px] leading-[16px] text-[#A9A9B2]"
      >
        {label}
      </Label>
      <Input 
        id={name}
        className={cn(
          "h-[36px] px-[12px] py-[8px]",
          "font-fact text-[14px] leading-[20px] font-normal",
          "text-[#1A1B22] placeholder:text-[#898989]",
          "bg-[#F9F9FB] border border-[#E3E4E8] rounded-[4px]",
          "focus:border-[#4855CB] focus:ring-1 focus:ring-[#4855CB]",
          "hover:border-[#4855CB] transition-colors"
        )}
        {...form.register(name)} 
      />
      {form.formState.errors[name] && (
        <span className="text-[#F33A3A] text-[12px] leading-[16px]">
          {form.formState.errors[name].message}
        </span>
      )}
    </div>
  )
} 