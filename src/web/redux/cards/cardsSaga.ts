import * as CardsApi from '@/web/apis/CardsApi';
import { put, call } from 'redux-saga/effects'
import { TypedAction } from "@/model/action";
import { store } from '@/web/redux/create-store';
import {
    CreateCardPayload, createCardSuccess,
    FetchCardsOfStepPayload, fetchCardsOfStepSuccess, MoveCardPayload, moveCardFailed, moveCardImmediately
} from "./cardsActions";
import { DragInfo, Card } from '@/model/card';
import { CardsMap } from './cardsReducer';


function* createCard(action: TypedAction<CreateCardPayload>) {
    const payload = action.payload!
    const { streamId, card } = payload
    try {
        const result = yield call(action => {
            return CardsApi.createCard(streamId, card)
        }, null)
        if (result && result?.id) {
            const { stepId } = card
            yield put(createCardSuccess(streamId, stepId, result))
        }
    } catch (error) {

    }
}

function* fetchCardsOfStep(action: TypedAction<FetchCardsOfStepPayload>) {
    const payload = action.payload!
    const { streamId, stepId } = payload
    try {
        const result = yield call(action => {
            return CardsApi.fetchCardsOfStep(streamId, stepId)
        }, null)
        if (result) {
            yield put(fetchCardsOfStepSuccess(streamId, stepId, result))
        }
    } catch (error) {

    }
}

function* moveCard(action: TypedAction<MoveCardPayload>) {
    const payload = action.payload!
    const { streamId, source, dest } = payload
    const prevCardMap = store.getState().cardsReducer.cardsMap
    try {
        const { stepId: sourceStepId, index: sourceIndex } = source
        const { stepId: destStepId, index: destIndex } = dest
        const sourceCardList = _getCardList(streamId, sourceStepId, prevCardMap)
        const destCardList = _getCardList(streamId, destStepId, prevCardMap)
        const movedCard = _getCardByPosition(sourceCardList, sourceIndex)
        if (!movedCard) return
        const newPosition = _generateNewPosition(destCardList, destIndex)
        const newCard: Card = { ...movedCard, stepId: destStepId, position: newPosition }
        yield put(moveCardImmediately(streamId, source, dest, newCard))

        const result = yield call(action => {
            return CardsApi.moveCards(streamId, movedCard.id, {
                stepId: destStepId,
                position: newPosition
            })
        }, null)

        if (!result && !result.id) {
            yield put(moveCardFailed(streamId, prevCardMap))
        }
    } catch (error) {
        console.error('error', error)
        yield put(moveCardFailed(streamId, prevCardMap))
    }
}

const _getCardList = (streamId: string, stepId: string, cardsMap: CardsMap) => {
    const path = `${streamId}/${stepId}`
    return cardsMap[path] ?? []
}

const _getCardByPosition = (cardList: Card[], index: number) => {
    if (index > cardList.length) return null
    return cardList[index]
}

const _generateNewPosition = (cardList: Card[], index: number) => {
    if (index === 0) return new Date().valueOf()
    if (index === cardList.length || index === cardList.length - 1) return cardList[cardList.length - 1].position - 1000000
    return (cardList[index].position + cardList[index + 1].position) / 2
}

export default {
    createCard,
    fetchCardsOfStep,
    moveCard
}