export interface UserData {
  display_name: string
  full_name: string
  first_name: string
  last_name: string
  email: string
  department: string
  job_title: string
  phone: string
  mobile: string
  location: string
  account_name: string
  distinguished_name?: string
  member_of?: string[]
  photo?: string
  when_created?: string
  when_changed?: string
}

// Маппинг данных пользователя для WorkerForm
export interface WorkerDataFromUser {
  fullname: string
  organization: string
  position: string
  email: string
  phoneWork: string
  phoneMobile: string
  website?: string
  photo?: string // base64 фотография пользователя
} 