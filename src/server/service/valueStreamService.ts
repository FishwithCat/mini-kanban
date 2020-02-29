import router from 'koa-router';
import shortid from 'shortid';
import ValueStreamDomain from '../domain/ValueStreamDomain';
import { ValueStream } from '@/model/ValueStream';

const valueStreamRouter = new router()
valueStreamRouter.prefix('/api/valueStream')

valueStreamRouter.get('/:id', async (ctx, next) => {
    const { id: streamId } = ctx.params
    const vsDomain = ValueStreamDomain.getInstance()
    const vsInfo = await vsDomain.getValueStream(streamId)
    ctx.body = vsInfo
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

export default valueStreamRouter