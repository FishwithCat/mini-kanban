import router from 'koa-router';
import CardsRepository from '../domain/CardsRepository';
import shortid from 'shortid';
import { Card } from '@/model/card';


const cardsRouter = new router()
cardsRouter.prefix('/api/cards')

const getCardsDomain = (streamId: string) => {
    const cardsRepository = CardsRepository.getRepository()
    return cardsRepository.getCardsDomain(streamId)
}

cardsRouter.get('/query', async (ctx, next) => {
    const { streamId, id } = ctx.request.query
    const cardsDomain = getCardsDomain(streamId)
    const data = await cardsDomain.queryCard(id)
    ctx.body = data
})

cardsRouter.get('/of-step', async (ctx, next) => {
    const { streamId, stepId } = ctx.request.query
    const cardsDomain = getCardsDomain(streamId)
    const data = await cardsDomain.queryCardsOfStep(stepId)
    ctx.body = data
})

cardsRouter.post('/create', async (ctx, next) => {
    const { card, streamId } = ctx.request.body
    if (!streamId) return ctx.body = {}
    const cardsDomain = getCardsDomain(streamId)
    const cardToSave: Card = {
        ...card,
        id: shortid.generate()
    }
    await cardsDomain.createCard(cardToSave)
    ctx.body = cardToSave
})


cardsRouter.put('/move', async (ctx, next) => {
    const { streamId, cardId, to } = ctx.request.body
    const { stepId, position } = to
    if (!streamId || !stepId) {
        // return res.status(500).send('move card without streamId')
        return
    }
    const cardsDomain = getCardsDomain(streamId)
    ctx.body = await cardsDomain.updateCardPosition(cardId, stepId, position)
})

/** 更新卡片内容 */
cardsRouter.put('/', async (ctx, next) => {
    const { streamId, card } = ctx.request.body
    if (!streamId || !card.id) {
        return
    }
    const cardsDomain = getCardsDomain(streamId)
    ctx.body = await cardsDomain.updateCardInfo(card)
})

cardsRouter.post('/archive', async (ctx, next) => {
    const { streamId, cardId } = ctx.request.body
    if (!streamId || !cardId) return
    const cardsDomain = getCardsDomain(streamId)
    ctx.body = await cardsDomain.archiveCard(cardId)
})

cardsRouter.post('/abandon', async (ctx, next) => {
    const { streamId, cardId } = ctx.request.body
    if (!streamId || !cardId) return
    const cardsDomain = getCardsDomain(streamId)
    ctx.body = await cardsDomain.abandonCard(cardId)
})

export default cardsRouter