import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/web/redux/create-store';
import { fetchValueStream } from '@/web/redux/valueStream/valueStreamActions';
import { ValueStreamStruct } from '@/model/ValueStream';


export const useValueStream = (streamId: string) => {
    const dispatch = useDispatch()
    const valueStreamStructMap = useSelector((state: RootState) => state.valueStreamReducer.valueStreamStructMap)

    const valueStreamStruct = React.useMemo<ValueStreamStruct | undefined>(() => {
        return valueStreamStructMap[streamId]
    }, [valueStreamStructMap, streamId])

    React.useEffect(() => {
        if (!streamId) return
        dispatch(fetchValueStream(streamId))
    }, [streamId])

    return valueStreamStruct
}