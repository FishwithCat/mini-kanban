import { Request } from './ApiBuilder';
import { CardPosition, CardInfo, Card } from '@/model/card';


export const queryCard = (streamId: string, cardId: string) => {
    return Request.get(`/cards/query?streamId=${streamId}&id=${cardId}`).then(res => res.data)
}

export const createCard = (streamId: string, card: CardInfo) => {
    return Request.post('/cards/create', { streamId, card }).then(res => res.data)
}

export const fetchCardsOfStep = (streamId: string, stepId: string) => {
    return Request.get(`/cards/of-step?streamId=${streamId}&stepId=${stepId}`)
        .then(res => res.data)
}

export const moveCards = (streamId: string, cardId: string, to: CardPosition) => {
    return Request.put(`/cards/move`, { streamId, cardId, to }).then(res => res.data)
}

export const updateCard = (streamId: string, card: Card) => {
    return Request.put('/cards', { streamId, card }).then(res => res.data)
} 