import { createDbHandler } from '../infrastructure/db';
import { Card } from '@/model/card'

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
        const cards = (await this.dbHandler).value()
        return (await this.dbHandler).push(newCard).write()
    }

    updateCardPosition = async (cardId: string, stepId: string, position: number) => {
        return (await this.dbHandler).find({ id: cardId })
            .set('stepId', stepId)
            .set('position', position)
            .write()
    }
}

export default CardsDomain