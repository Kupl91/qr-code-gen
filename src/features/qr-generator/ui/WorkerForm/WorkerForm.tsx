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

  // Массив полей, которые должны быть только для чтения
  const readonlyFields: (keyof WorkerDTO)[] = ['firstname', 'lastname', 'position', 'organization', 'email'];

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
    <div className="relative w-full h-screen flex flex-col">
      <Button 
        onClick={onCancel}
        className={cn(
          "absolute",
          "left-0",
          "top-3",
          "sm:left-0",
          "sm:top-4",
          "flex items-center",
          "h-[40px]",
          "gap-[4px]",
          "pl-4",
          "text-[14px]",
          "leading-[20px]",
          "font-fact font-medium",
          "text-[#4855CB]",
          "bg-transparent",
          "hover:bg-transparent",
          "shadow-none",
          "border-none",
          "outline-none",
          "z-10",
        )}
      >
        <ArrowLeft className="w-5 h-5 stroke-[2] opacity-100" />
        <span className="opacity-100">Назад</span>
      </Button>

      <div className={cn(
        "w-full",
        "flex-grow",
        "overflow-y-auto",
        "pb-[80px]",
        "pt-[64px]",
        "sm:pt-[128px]",
      )}>
        <div className={cn(
          "w-full",
          "px-0",
          "mx-auto",
          "sm:px-6",
          "md:px-0",
          "md:max-w-[580px]",
          "lg:max-w-[680px]"
        )}>
          <div className="flex flex-col gap-4 w-full">
            <Card className={cn(
              "w-full",
              "bg-white",
              "rounded-[8px]",
              "shadow-sm",
              "overflow-hidden"
            )}>
              <div className={cn(
                "w-full",
                "p-6",
                "sm:p-8",
                "space-y-4"
              )}>
                <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
                  <div className="space-y-3">
                    <FormField label="Имя" name="firstname" form={form} readonly={readonlyFields.includes('firstname')} />
                    <FormField label="Фамилия" name="lastname" form={form} readonly={readonlyFields.includes('lastname')} />
                    <FormField label="Организация" name="organization" form={form} readonly={readonlyFields.includes('organization')} />
                    <FormField label="Должность" name="position" form={form} readonly={readonlyFields.includes('position')} />
                    <FormField label="Рабочий телефон" name="phoneWork" form={form} readonly={readonlyFields.includes('phoneWork')} />
                    <FormField label="Мобильный телефон" name="phoneMobile" form={form} readonly={readonlyFields.includes('phoneMobile')} />
                    <FormField label="Email" name="email" form={form} readonly={readonlyFields.includes('email')} />
                    <FormField label="Веб-сайт" name="website" form={form} readonly={readonlyFields.includes('website')} />
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <div className={cn(
        "w-full",
        "px-2",
        "sm:px-6",
        "md:px-0",
        "mt-auto",
        "pb-2",
        "absolute",
        "bottom-0",
        "left-0",
        "right-0",
        "bg-white",
      )}>
        <Button 
          onClick={form.handleSubmit(onSave)}
          className={cn(
            "w-full",
            "h-[44px]",
            "font-fact",
            "text-[14px]",
            "leading-[20px]",
            "font-medium",
            "bg-[#4855CB]",
            "hover:bg-[#3A45A3]",
            "text-white",
            "rounded-[8px]",
            "shadow-sm",
            "mt-4",
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
  readonly?: boolean;
}

function FormField({ label, name, form, readonly = false }: FormFieldProps) {
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
          "hover:border-[#4855CB] transition-colors",
          readonly && "bg-[#F0F0F5] cursor-not-allowed opacity-90"
        )}
        readOnly={readonly}
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