import React from 'react';
import styled from 'styled-components';
import { Step } from '@/model/ValueStream';
import { useValueStream } from '@/web/hooks/useValueStream';
import { useDispatch } from 'react-redux';
import { generate } from 'shortid';
// import { updateSteps } from '@/web/redux/valueStream/valueStreamActions';
import { StepView } from './StepView';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { moveCard } from '@/web/redux/cards/cardsActions';
import { ModifyStepModal } from '../components/ModifyStep/ModifyStepModal';
import { updateStep } from '@/web/redux/valueStream/valueStreamActions';
import { Menu } from '../menu';


interface ValueStreamProps {
    id: string
}
export const ValueStream: React.FC<ValueStreamProps> = React.memo(props => {
    const { id } = props

    const dispatch = useDispatch()
    const valueStream = useValueStream(id)

    const onCreateStep = React.useCallback(
        () => {
            dispatch(updateStep(id, {
                id: generate(),
                name: '新步骤'
            }))
        }, [dispatch, id]
    )

    const onDragEnd = React.useCallback(
        (result: DropResult) => {
            const { source, destination } = result
            if (!destination) return
            dispatch(moveCard(id,
                { stepId: source.droppableId, index: source.index },
                { stepId: destination.droppableId, index: destination.index }
            ))
        },
        []
    )

    return (
        <Wrapper className="value-stream">
            {
                valueStream?.steps &&
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="step-box">
                        {
                            valueStream.steps.map((step, index) => (
                                <StepView key={step.id}
                                    streamId={id}
                                    step={step}
                                    canCreateCard={index === 0} />
                            ))
                        }

                        <div className="create-step-btn" >
                            <span onClick={onCreateStep}>新建步骤</span>
                        </div>
                    </div>
                </DragDropContext>
            }
            <ModifyStepModal streamId={id} />
        </Wrapper>
    )
})

const Wrapper = styled.div`
    width: fit-content;
    height: 100%;

    .step-box {
        display: flex;
        height: 100%;
    }

    .create-step-btn {
        height: 32px;
        line-height: 32px;
        white-space: nowrap;
        text-align: center;
        margin: 0 20px;
        color: #ddd;
        transition: color .3s ease-out;
        cursor: pointer;
        
        &:hover {
            color: #2196f3;
        }
    }
`