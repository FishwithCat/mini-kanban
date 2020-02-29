import { Request } from './ApiBuilder';
import { ValueStreamStruct, Step } from '@/model/ValueStream';


export const fetchValueStream = (id: string) => {
    return Request.get(`/valueStream/${id}`).then(res => res.data)
}

export const createValueStream = (userId: string, valueStreamStruct: ValueStreamStruct) => {
    return Request.post(`/valueStream/create`, { userId, ...valueStreamStruct })
        .then(res => res.data)
}

export const deleteValueStream = (streamId: string) => {
    return Request.delete(`/valueStream/${streamId}`).then(res => res.data)
}

// export const updateSteps = (streamId: string, newSteps: Step[]) => {
//     return Request.put(`/valueStream/update-steps`, {
//         id: streamId,
//         newSteps
//     }).then(res => res.data)
// }

export const updateStep = (streamId: string, newStep: Step) => {
    return Request.put(`/valueStream/step`, {
        id: streamId,
        step: newStep
    }).then(res => res.data)
}

export const deleteStep = (streamId: string, stepId: string) => {
    return Request.delete(`/valueStream/step?streamId=${streamId}&stepId=${stepId}`).then(res => res.data)
}