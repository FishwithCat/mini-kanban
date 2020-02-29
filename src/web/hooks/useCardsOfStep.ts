import React from 'react';
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/web/redux/create-store"
import { fetchCardsOfStep } from '@/web/redux/cards/cardsActions';

export const useCardsOfStep = (streamId: string, stepId: string) => {
    const cardsMap = useSelector((state: RootState) => state.cardsReducer.cardsMap)
    const path = `${streamId}/${stepId}`
    const dispatch = useDispatch()

    const cardsOfStep = React.useMemo(() => {
        return cardsMap[path] ?? []
    }, [cardsMap, path])

    React.useEffect(() => {
        if (!streamId || !stepId) return
        dispatch(fetchCardsOfStep(streamId, stepId))
    }, [streamId, stepId])

    return cardsOfStep
}