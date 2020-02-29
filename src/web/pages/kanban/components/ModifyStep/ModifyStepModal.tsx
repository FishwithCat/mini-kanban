import React from 'react';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/web/redux/create-store';
import { setModifiedStep, updateStep } from '@/web/redux/valueStream/valueStreamActions';
import { ModifyStep } from '.';
import { Step } from '@/model/ValueStream';

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

    const modalStyle = React.useMemo<React.CSSProperties>(() => {
        if (modifiedStep?.modalPosition) {
            const modalWith = 250
            const { modalPosition } = modifiedStep
            const { x, y } = modalPosition
            if (x + modalWith >= document.body.clientWidth) {
                return {
                    top: y,
                    left: x - modalWith
                }
            }
            return {
                top: y,
                left: x,
            }
        }
        return {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }
    }, [modifiedStep])

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Wrapper>
                {
                    modifiedStep?.data &&
                    <ModifyStep
                        style={modalStyle}
                        defaultStep={modifiedStep.data}
                        onSave={handleUpdateStep}
                    />
                }
            </Wrapper>
        </Modal>
    )
})

const Wrapper = styled.div`
    outline: none;

    .modify-step {
        position: absolute;
    }
`