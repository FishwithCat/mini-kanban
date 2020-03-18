import { createDbHandler } from '../infrastructure/db';
import { Card, TimePoint, ARCHIVE, ABANDON } from '@/model/card'
import { EmptyArray } from '@/model/empty';


class CardsDomain {
    private mainDbHandler: any
    private archiveDbHandler: any
    private abandonDbHandler: any

    constructor(streamId: string) {
        const init: Card[] = []
        this.mainDbHandler = createDbHandler(streamId, init)
        this.archiveDbHandler = createDbHandler(`ARCHIVE_${streamId}`, init)
        this.abandonDbHandler = createDbHandler(`ABANDON_${streamId}`, init)
    }

    queryCard = async (cardId: string) => {
        return (await this.mainDbHandler).find({ id: cardId }).value()
    }

    queryCardsOfStep = async (stepId: string) => {
        return (await this.mainDbHandler).filter((card: Card) => card.stepId === stepId).value()
    }

    createCard = async (newCard: Card) => {
        // const cards = (await this.dbHandler).value()
        const cardToSave = {
            ...newCard,
            timeLine: [{ stepId: newCard.stepId, timeStamp: new Date().valueOf() }]
        }
        return (await this.mainDbHandler).push(cardToSave).write()
    }

    updateCardPosition = async (cardId: string, stepId: string, position: number) => {
        const mainDbHandler = await this.mainDbHandler
        const cardInfo: Card = await mainDbHandler.find({ id: cardId }).value()
        let timeLime = cardInfo.timeLine ?? EmptyArray
        if (cardInfo.stepId !== stepId) {
            timeLime = timeLime.concat({ stepId, timeStamp: new Date().valueOf() })
        }
        return mainDbHandler.find({ id: cardId })
            .set('stepId', stepId)
            .set('position', position)
            .set('timeLine', timeLime)
            .write()
    }

    updateCardInfo = async (card: Card) => {
        const { describe, priority, title, participants } = card
        return (await this.mainDbHandler).find({ id: card.id })
            .set('describe', describe)
            .set('priority', priority)
            .set('title', title)
            .set('participants', participants)
            .write()
    }

    archiveCard = async (cardId: string) => {
        const mainDbHandler = (await this.mainDbHandler)
        const archiveDbHandler = (await this.archiveDbHandler)

        const cardInfo: Card | undefined = await mainDbHandler.find({ id: cardId }).value()
        if (!cardInfo?.id) return

        let timeLime: TimePoint[] = cardInfo.timeLine ?? [];
        timeLime.push({
            stepId: ARCHIVE,
            timeStamp: new Date().valueOf()
        });
        await mainDbHandler.remove({ id: cardId }).write();
        await archiveDbHandler.push(cardInfo).write()
        return cardInfo
    }

    abandonCard = async (cardId: string) => {
        const mainDbHandler = (await this.mainDbHandler)
        const abandonDbHandler = (await this.abandonDbHandler)

        const cardInfo: Card | undefined = await mainDbHandler.find({ id: cardId }).value()
        if (!cardInfo?.id) return
        let timeLime: TimePoint[] = cardInfo.timeLine ? [...cardInfo.timeLine] : EmptyArray;
        timeLime = timeLime.concat({
            stepId: ABANDON,
            timeStamp: new Date().valueOf()
        });
        await mainDbHandler.remove({ id: cardId }).write();
        await abandonDbHandler.push({
            ...cardInfo,
            timeLime
        }).write()
        return cardInfo
    }
}

export default CardsDomain