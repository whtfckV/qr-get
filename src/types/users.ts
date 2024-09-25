import { Settings } from './settings'

export type User = {
  id: string,
  username: string,
  surname: string,
  name: string,
  patronymic: string,
  role: 'user',
  is_archived: boolean
  settings: Settings
}

export type Users = User[]
