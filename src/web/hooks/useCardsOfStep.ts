import React from 'react';
import { useSelector } from "react-redux"
import { RootState } from "@/web/redux/create-store"
import { EmptyArray } from '@/model/empty';

export const useCardsOfStep = (streamId: string, stepId: string) => {
    const cardsMap = useSelector((state: RootState) => state.cardsReducer.cardsMap)
    const path = `${streamId}/${stepId}`

    const cardsOfStep = React.useMemo(() => {
        return cardsMap[path] ?? EmptyArray
    }, [cardsMap, path])

    return cardsOfStep
}