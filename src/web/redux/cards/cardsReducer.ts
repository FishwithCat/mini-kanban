import { Card } from "@/model/card";
import { TypedAction } from "@/model/action";
import { Reducer } from "redux";
import cardsActionKeys from "./cardsActionKeys";
import {
    FetchCardsOfStepSuccessPayload, CreateCardSuccessPayload,
    MoveCardImmediatelyPayload, SetModifiedCardPayload,
    FetchCardDetailSuccessPayload,
    UpdateCardSuccessPayload
} from "./cardsActions";
import { listImmutableDelete, listImmutableInsert } from "@/web/utils/immutable";
import { EmptyArray } from "@/model/empty";
import { immutableUpdateObjList } from "@/model/utils";

export type CardsMap = Record<path, Card[]>

export interface ModifiedCard {
    streamId: string,
    cardId: string,
}

type path = string
export interface CardsState {
    cardsMap: CardsMap,
    modifiedCard: ModifiedCard | null,
    cardDetail: Card | null
}

const initState: CardsState = {
    cardsMap: {},
    modifiedCard: null,
    cardDetail: null
}

export const cardsReducer: Reducer<CardsState, TypedAction> = (state = initState, action) => {
    switch (action.type) {
        case cardsActionKeys.fetchCardsOfStepSuccess:
            return handleFetchCardsOfStepSuccess(state, action.payload)
        case cardsActionKeys.createCardSuccess:
            return handleCreateCardSuccess(state, action.payload)
        case cardsActionKeys.moveCardSuccess:
            return state
        case cardsActionKeys.moveCardImmediately:
            return handleMoveCardImmediateLy(state, action.payload)
        case cardsActionKeys.setModifiedCard:
            return handleSetModifiedCard(state, action.payload)
        case cardsActionKeys.fetchCardDetailSuccess:
            return handleFetchCardDetailSuccess(state, action.payload)
        case cardsActionKeys.updateCardSuccess:
            return handleUpdateCardSuccess(state, action.payload)
        default:
            return state
    }
}

const handleFetchCardsOfStepSuccess = (state: CardsState, payload: FetchCardsOfStepSuccessPayload) => {
    const { streamId, stepId, cards } = payload
    const cardsMap = { ...state.cardsMap }
    const path = `${streamId}/${stepId}`
    cardsMap[path] = cards.sort((a, b) => b.position - a.position)
    return {
        ...state,
        cardsMap
    }
}

const handleCreateCardSuccess = (state: CardsState, payload: CreateCardSuccessPayload) => {
    const { streamId, stepId, card } = payload
    const cardsMap = { ...state.cardsMap }
    const path = `${streamId}/${stepId}`
    let cardsList = cardsMap[path]
    if (cardsList === undefined) {
        cardsList = [card]
    } else {
        cardsList = [card].concat(cardsList)
    }
    cardsMap[path] = cardsList.sort((a, b) => b.position - a.position)
    return {
        ...state,
        cardsMap
    }
}

const handleMoveCardImmediateLy = (state: CardsState, payload: MoveCardImmediatelyPayload) => {
    const { streamId, source, dest, newCard } = payload
    const { stepId: sourceStepId, index: sourceIndex } = source
    const { stepId: destStepId, index: destIndex } = dest
    const cardsMap = { ...state.cardsMap }
    cardsMap[`${streamId}/${sourceStepId}`] = listImmutableDelete(cardsMap[`${streamId}/${sourceStepId}`], sourceIndex)
    cardsMap[`${streamId}/${destStepId}`] = listImmutableInsert(cardsMap[`${streamId}/${destStepId}`], destIndex, newCard)
    return {
        ...state,
        cardsMap
    }
}

const handleSetModifiedCard = (state: CardsState, payload: SetModifiedCardPayload) => {
    const { streamId, cardId } = payload
    if (cardId == null) {
        return {
            ...state,
            modifiedCard: null
        }
    }
    return {
        ...state,
        modifiedCard: { streamId, cardId }
    }
}

const handleFetchCardDetailSuccess = (state: CardsState, payload: FetchCardDetailSuccessPayload) => {
    const { card } = payload
    if (!card?.id) return state
    return {
        ...state,
        cardDetail: card
    }
}

const handleUpdateCardSuccess = (state: CardsState, payload: UpdateCardSuccessPayload) => {
    const { streamId, card } = payload
    if (!streamId || !card.id) return state
    const { stepId } = card
    const path = `${streamId}/${stepId}`
    const cardsMap = { ...state.cardsMap }
    cardsMap[path] = immutableUpdateObjList((cardsMap[path] ?? EmptyArray), card, 'id')
    return {
        ...state,
        cardsMap,
        modifiedCard: null
    }
}