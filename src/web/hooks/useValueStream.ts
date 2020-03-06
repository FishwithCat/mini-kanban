import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '@/web/redux/create-store';
import { ValueStreamStruct } from '@/model/ValueStream';


export const useValueStream = (streamId: string) => {
    const valueStreamStructMap = useSelector((state: RootState) => state.valueStreamReducer.valueStreamStructMap)

    const valueStreamStruct = React.useMemo<ValueStreamStruct | undefined>(() => {
        return valueStreamStructMap[streamId]
    }, [valueStreamStructMap, streamId])

    return valueStreamStruct
}