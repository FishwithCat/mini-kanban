export const CURRENT_USER = 'currentUser'

export interface UserInStorage {
    id: string,
    name: string,
    active: string | undefined // 活跃看板Id
}