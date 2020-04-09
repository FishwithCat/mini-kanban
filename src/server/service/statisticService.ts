import router from 'koa-router';
import { BaseQuery } from '@/model/query';
import { getCardsDomain } from '@/server/service/cardsService';
import { Card } from '@/model/card';
import dayjs from 'dayjs';


const statisticRouter = new router()
statisticRouter.prefix('/api/statistic')


statisticRouter.post('/leadtime', async (ctx, next) => {
    const { streamId, period, stepRange } = ctx.request.body
    const query = new BaseQuery(period, stepRange)
    const cardsDomain = getCardsDomain(streamId)
    const cards = await cardsDomain.queryCardsByCondition(query)
    ctx.body = _generateLeadTimeMap(cards)

})

const _generateLeadTimeMap = (cards: Card[]): Record<number, string[]> => {
    let leadTimeMap: Record<number, string[]> = {}
    cards.forEach(card => {
        const { timeLine } = card
        if (!timeLine) return
        const startDate = timeLine[0]
        const endDate = timeLine[timeLine.length - 1]
        if (endDate.stepId !== '__ARCHIVE') return
        const duration = dayjs(endDate.timeStamp).diff(dayjs(startDate.timeStamp), 'day')
        leadTimeMap[duration] = leadTimeMap[duration] ? leadTimeMap[duration].concat(card.id) : [card.id]
    })
    return leadTimeMap
}

export default statisticRouter