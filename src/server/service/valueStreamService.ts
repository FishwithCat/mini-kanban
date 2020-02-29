import router from 'koa-router';
import shortid from 'shortid';
import UsersDomain from '../domain/UserDomain';
import ValueStreamDomain from '../domain/ValueStreamDomain';
import { ValueStream } from '@/model/ValueStream';
import { EmptyArray } from '@/model/empty';
import md5 from 'md5';
import { User } from '@/model/user';

/**
 * valueStream 返回的成员列表，必须保证第一个是 creator
 */

const valueStreamRouter = new router()
valueStreamRouter.prefix('/api/valueStream')

valueStreamRouter.get('/:id', async (ctx, next) => {
    const { id: streamId } = ctx.params
    const vsDomain = ValueStreamDomain.getInstance()
    ctx.body = await vsDomain.getValueStream(streamId)
})

valueStreamRouter.get('/members/:id', async (ctx, next) => {
    const { id: streamId } = ctx.params
    const vsDomain = ValueStreamDomain.getInstance()
    const streamInfo: ValueStream = await vsDomain.getValueStream(streamId)
    const { creator, members } = streamInfo
    const membersInfo = await getUserInfoList([creator].concat(members ?? EmptyArray))
    ctx.body = {
        id: streamId,
        members: membersInfo
    }
})

// valueStreamRouter.get('/steps/:id', async (ctx, next) => {
//     const { id: streamId } = ctx.params
//     const vsDomain = ValueStreamDomain.getInstance()
//     const steps = await vsDomain.getValueStreamSteps(streamId)
//     ctx.body = { id: streamId, steps }
// })

valueStreamRouter.post('/create', async (ctx, next) => {
    const { userId, name, steps } = ctx.request.body
    const vsDomain = ValueStreamDomain.getInstance()
    const id = shortid.generate()
    const newValueStream: ValueStream = {
        id, name, steps,
        creator: userId,
        members: []
    }
    await vsDomain.createValueStream(newValueStream)
    ctx.body = newValueStream
})

valueStreamRouter.delete('/', async (ctx, next) => {
    const { id: streamId } = ctx.request.query
    const vsDomain = ValueStreamDomain.getInstance()
    await vsDomain.deleteValueStream(streamId)
    ctx.body = { id: streamId }
})

valueStreamRouter.put('/step', async (ctx, next) => {
    const { id: streamId, step: newStep } = ctx.request.body
    const vsDomain = ValueStreamDomain.getInstance()
    ctx.body = await vsDomain.updateValueStreamStep(streamId, newStep)
    // ctx.body = { id: streamId, steps: newSteps }
})

valueStreamRouter.delete('/step', async (ctx, next) => {
    const { streamId, stepId } = ctx.request.query
    const vsDomain = ValueStreamDomain.getInstance()
    ctx.body = await vsDomain.deleteStep(streamId, stepId)
})

valueStreamRouter.put('/invite', async (ctx, next) => {
    const { id: streamId, memberName } = ctx.request.body
    const vsDomain = ValueStreamDomain.getInstance()
    const usersDomain = UsersDomain.getInstance()
    const newMemberId = md5(memberName)
    const userInfo = await usersDomain.getUserInfo(newMemberId)
    if (!userInfo) {
        await usersDomain.createUser({ id: newMemberId, name: memberName })
    }
    const streamInfo: ValueStream = await vsDomain.getValueStream(streamId)
    if (!streamInfo?.id) {
        return ctx.body = {}
    }
    const newValueStream = await vsDomain.updateMembers(streamId, newMemberId)
    const { members, creator } = newValueStream
    const membersInfo = await getUserInfoList([creator].concat(members ?? EmptyArray))
    ctx.body = {
        id: streamId,
        members: membersInfo
    }
})

valueStreamRouter.put('/delete-member', async (ctx, next) => {
    const { id: streamId, memberId } = ctx.request.body
    const vsDomain = ValueStreamDomain.getInstance()
    const newValueStream = await vsDomain.deleteMember(streamId, memberId)
    const { members, creator } = newValueStream
    const membersInfo = await getUserInfoList([creator].concat(members ?? EmptyArray))
    ctx.body = {
        id: streamId,
        members: membersInfo
    }
})

const getUserInfoList = async (userIdList: string[]) => {
    const usersDomain = UsersDomain.getInstance()
    const membersInfo: User[] = await usersDomain.getUsersInfo(userIdList)
    let result: User[] = []
    userIdList.forEach(id => {
        const info = membersInfo.find(item => item.id === id)
        if (info) result = result.concat(info)
    })
    return result
}

export default valueStreamRouter