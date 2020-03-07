import { createDbHandler } from '../infrastructure/db';
import { Card } from '@/model/card'
import { EmptyArray } from '@/model/empty';

class CardsDomain {
    private dbHandler: any

    constructor(streamId: string) {
        const init: Card[] = []
        this.dbHandler = createDbHandler(streamId, init)
    }

    queryCard = async (cardId: string) => {
        return (await this.dbHandler).find({ id: cardId }).value()
    }

    queryCardsOfStep = async (stepId: string) => {
        return (await this.dbHandler).filter((card: Card) => card.stepId === stepId).value()
    }

    createCard = async (newCard: Card) => {
        // const cards = (await this.dbHandler).value()
        const cardToSave = {
            ...newCard,
            timeLine: [{ stepId: newCard.stepId, timeStamp: new Date().valueOf() }]
        }
        return (await this.dbHandler).push(cardToSave).write()
    }

    updateCardPosition = async (cardId: string, stepId: string, position: number) => {
        const cardInfo: Card = await (await this.dbHandler).find({ id: cardId }).value()
        let timeLime = cardInfo.timeLine ?? EmptyArray
        if (cardInfo.stepId !== stepId) {
            timeLime = timeLime.concat({ stepId, timeStamp: new Date().valueOf() })
        }
        return (await this.dbHandler).find({ id: cardId })
            .set('stepId', stepId)
            .set('position', position)
            .set('timeLine', timeLime)
            .write()
    }

    updateCardInfo = async (card: Card) => {
        const { describe, priority, title, participants } = card
        return (await this.dbHandler).find({ id: card.id })
            .set('describe', describe)
            .set('priority', priority)
            .set('title', title)
            .set('participants', participants)
            .write()

    }
}

export default CardsDomain