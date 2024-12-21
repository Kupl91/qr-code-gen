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
    <div className="fixed inset-0 overflow-y-auto pt-[40px] pb-[40px]">
      <div className="relative w-[580px] mx-auto">
        <Button 
          variant="ghost" 
          onClick={onCancel}
          className="flex flex-row items-center gap-[6px] mb-[16px] hover:bg-transparent"
        >
          <ArrowLeft className="w-[16px] h-[16px] stroke-[#4855CB] stroke-[1.8]" />
          <span className="text-[12px] leading-[16px] font-medium text-[rgb(72,85,203)]">
            Назад
          </span>
        </Button>

        <Card className="flex flex-col items-start p-[24px] gap-[16px] w-full bg-white rounded-[var(--card-radius)]">
          <div className="flex flex-col w-full">
            <div className="mb-[16px]">
              <h1 className="text-[24px] leading-[32px] font-medium text-[rgb(36,36,41)]">
                Редактировать личные данные
              </h1>
            </div>

            <form onSubmit={form.handleSubmit(onSave)} className="flex flex-col gap-[16px] w-full">
              <div className="space-y-[16px]">
                <FormField
                  label="Имя"
                  name="firstname"
                  form={form}
                />
                <FormField
                  label="Фамилия" 
                  name="lastname"
                  form={form}
                />
                <FormField
                  label="Организация"
                  name="organization"
                  form={form}
                />
                <FormField
                  label="Должность"
                  name="position"
                  form={form}
                />
                <FormField
                  label="Рабочий телефон"
                  name="phoneWork"
                  form={form}
                />
                <FormField
                  label="Мобильный телефон"
                  name="phoneMobile"
                  form={form}
                />
                <FormField
                  label="Email"
                  name="email"
                  form={form}
                />
                <FormField
                  label="Веб-сайт"
                  name="website"
                  form={form}
                />
              </div>
              
              <div className="flex justify-end mt-[24px]">
                <Button 
                  type="submit"
                  className="flex flex-row justify-center items-center px-[16px] py-[8px] gap-[4px] w-[100px] h-[36px] bg-[#4855CB] hover:bg-[#3A45A3] rounded-[4px]"
                >
                  <span className="font-fact font-medium text-[12px] leading-[16px] text-white">
                    Сохранить
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}

// Выделим повторяющуюся структуру полей в отдельный компонент
interface FormFieldProps {
  label: string;
  name: keyof WorkerDTO;
  form: any; // Можно типизировать точнее через UseFormReturn<WorkerDTO>
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