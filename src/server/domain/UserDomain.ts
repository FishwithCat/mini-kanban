import { User } from "@/model/user"

import { createDbHandler } from '../infrastructure/db'


/**
 * singleton
 */

class UsersDomain {
    private dbHandler: any

    constructor() {
        const users: User[] = []
        this.dbHandler = createDbHandler('users', users)
    }

    static getInstance = () => {
        let singleton;
        if (!singleton) {
            singleton = new UsersDomain()
        }
        return singleton
    }

    getUserList = async () => {
        return (await this.dbHandler).value()
    }

    getUserInfo = async (userId: string) => {
        return (await this.dbHandler).find({ id: userId }).value()
    }

    getUsersInfo = async (userIdList: string[]) => {
        return (await this.dbHandler).filter((user: User) => userIdList.includes(user.id)).value()
    }

    createUser = async (userInfo: User) => {
        return (await this.dbHandler).push(userInfo).write()
    }

}

export default UsersDomain