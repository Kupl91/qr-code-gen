export interface UserData {
  organizationId: string
  organizationName: string
  departmentId: string
  departmentName: string
  outerId: string
  userId: string
  userADLogin: string
  email: string
  positionName: string
  positionId: string
  lastName: string
  firstName: string
  middleName: string
  phone: string
  dateHire: string
  dateFire: string | null
  dateBirth: string
}

export interface WorkerInfo {
  firstname: string
  lastname: string
  organization: string
  position: string
  phoneWork: string
  phoneMobile: string
  email: string
  website: string
} 