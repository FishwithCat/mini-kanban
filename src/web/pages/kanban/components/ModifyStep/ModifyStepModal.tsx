import React from 'react';
import styled from 'styled-components';
// import Modal from '@material-ui/core/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/web/redux/create-store';
import { setModifiedStep, updateStep } from '@/web/redux/valueStream/valueStreamActions';
import { ModifyStep } from '.';
import { Step } from '@/model/ValueStream';
import { MModal } from '@/web/components/MModal';

interface ModifyStepModalProps {
    streamId: string
}
export const ModifyStepModal: React.FC<ModifyStepModalProps> = React.memo(props => {
    const { streamId } = props
    const dispatch = useDispatch()
    const modifiedStep = useSelector((state: RootState) => state.valueStreamReducer.modifiedStep)
    const open = Boolean(modifiedStep)

    const handleClose = React.useCallback(() => {
        dispatch(setModifiedStep(null))
    }, [])

    const handleUpdateStep = React.useCallback(
        (newStep: Step) => {
            dispatch(setModifiedStep(null))
            dispatch(updateStep(streamId, newStep))
        },
        [streamId]
    )


    return (
        <MModal
            width={300}
            footer={null}
            closable={false}
            visible={open}
            onCancel={handleClose}
        >
            {
                modifiedStep &&
                <ModifyStep
                    defaultStep={modifiedStep}
                    onSave={handleUpdateStep}
                />
            }
        </MModal>
    )
})