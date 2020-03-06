import cardsActionKeys from './cardsActionKeys'
import { TypedAction } from "@/model/action";
import { Card, DragInfo, CardInfo } from '@/model/card';
import { CardsMap } from './cardsReducer';


export interface CreateCardPayload {
    streamId: string,
    card: CardInfo
}
export const createCard = (streamId: string, card: CardInfo): TypedAction<CreateCardPayload> => ({
    type: cardsActionKeys.createCard,
    payload: { streamId, card }
})

export interface CreateCardSuccessPayload {
    streamId: string,
    stepId: string,
    card: Card
}
export const createCardSuccess = (streamId: string, stepId: string, card: Card): TypedAction<CreateCardSuccessPayload> => ({
    type: cardsActionKeys.createCardSuccess,
    payload: { streamId, stepId, card }
})


export interface FetchCardsOfStepPayload {
    streamId: string,
    stepId: string
}
export const fetchCardsOfStep = (streamId: string, stepId: string): TypedAction<FetchCardsOfStepPayload> => ({
    type: cardsActionKeys.fetchCardsOfStep,
    payload: { streamId, stepId }
})

export interface FetchCardsOfStepSuccessPayload {
    streamId: string,
    stepId: string,
    cards: Card[]
}
export const fetchCardsOfStepSuccess = (streamId: string, stepId: string, cards: Card[]): TypedAction<FetchCardsOfStepSuccessPayload> => ({
    type: cardsActionKeys.fetchCardsOfStepSuccess,
    payload: { streamId, stepId, cards }
})

export interface MoveCardPayload {
    streamId: string,
    source: DragInfo,
    dest: DragInfo
}
export const moveCard = (streamId: string, source: DragInfo, dest: DragInfo): TypedAction<MoveCardPayload> => ({
    type: cardsActionKeys.moveCard,
    payload: { streamId, source, dest }
})

export interface MoveCardSuccessPayload {
    streamId: string
}
export const moveCardSuccess = (streamId: string): TypedAction<MoveCardSuccessPayload> => ({
    type: cardsActionKeys.moveCardSuccess,
    payload: { streamId }
})

export interface MoveCardFailedPayload {
    streamId: string,
    cardsMap: CardsMap
}
export const moveCardFailed = (streamId: string, cardsMap: CardsMap): TypedAction<MoveCardFailedPayload> => ({
    type: cardsActionKeys.moveCardFailed,
    payload: { streamId, cardsMap }
})

export interface MoveCardImmediatelyPayload {
    streamId: string,
    source: DragInfo,
    dest: DragInfo,
    newCard: Card
}
export const moveCardImmediately = (streamId: string, source: DragInfo, dest: DragInfo, newCard: Card): TypedAction<MoveCardImmediatelyPayload> => ({
    type: cardsActionKeys.moveCardImmediately,
    payload: { streamId, source, dest, newCard }
})

export interface SetModifiedCardPayload {
    streamId: string,
    cardId: string | null
}
export const setModifiedCard = (streamId: string, cardId: string | null): TypedAction<SetModifiedCardPayload> => ({
    type: cardsActionKeys.setModifiedCard,
    payload: { streamId, cardId }
})