import router from 'koa-router';
import ValueStreamDomain from '../domain/ValueStreamDomain';
import UsersDomain from '../domain/UserDomain';
import md5 from 'md5';
import { User } from '@/model/user';
import { EmptyArray } from '@/model/empty';


const userRouter = new router()
userRouter.prefix('/api/user')


userRouter.get('/:id', async (ctx, next) => {
    const { id } = ctx.params
    const userDomain = UsersDomain.getInstance()
    const userInfo = userDomain.getUserInfo(id)
    if (userInfo == null) return
    ctx.body = userInfo
})

userRouter.post('/login', async (ctx, next) => {
    const { name } = ctx.request.body
    const userDomain = UsersDomain.getInstance()
    const id = md5(name)
    const userInfo = await userDomain.getUserInfo(id)
    if (userInfo) {
        const vsDomain = ValueStreamDomain.getInstance()
        const { id: userId } = userInfo
        const availableList = await vsDomain.getAvailableValueStreamOfUser(userId)
        return ctx.body = {
            ...userInfo,
            available: availableList
        }
    } else {
        const newUser: User = { id, name }
        await userDomain.createUser(newUser)
        return ctx.body = { ...newUser, available: EmptyArray }
    }
})

export default userRouter;