import React from 'react';
import styled from 'styled-components';
import { useValueStream } from '@/web/hooks/useValueStream';
import { useDispatch } from 'react-redux';
import { generate } from 'shortid';
// import { updateSteps } from '@/web/redux/valueStream/valueStreamActions';
import { StepView } from './StepView';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { moveCard } from '@/web/redux/cards/cardsActions';
import { ModifyStepModal } from '../components/ModifyStep/ModifyStepModal';
import { updateStep } from '@/web/redux/valueStream/valueStreamActions';
import { Members } from '../components/Members';


interface ValueStreamProps {
    id: string
}
export const ValueStream: React.FC<ValueStreamProps> = React.memo(props => {
    const { id } = props

    const [showMembers, setShowMembers] = React.useState(false)

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
            <Menu className="menu">
                <i className="iconfont icon-team" onClick={() => setShowMembers(true)} />
            </Menu>
            <div className="value-stream-content">
                <div className="value-stream-content-scroll-area">
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
                </div>
                {
                    valueStream &&
                    <Members open={showMembers}
                        streamId={id}
                        closeMembers={() => setShowMembers(false)}
                    />
                }
            </div>
            <ModifyStepModal streamId={id} />
        </Wrapper>
    )
})

const Menu = styled.div`
    height: 32px;
    line-height: 32px;
    background: #fff;
    text-align: right;
    padding: 0 20px;

    > i {
        font-size: 18px;
        cursor: pointer;
    }
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;

    > .value-stream-content {
        position: relative;
        flex: 1;

        > .value-stream-content-scroll-area {
            height: 100%;
            padding: 10px;
            overflow-x: auto;

            .step-box {
                display: flex;
                height: 100%;
                width: fit-content;
            }

            .create-step-btn {
                height: 32px;
                line-height: 32px;
                white-space: nowrap;
                text-align: center;
                margin: 0 50px;
                color: #ddd;
                transition: color .3s ease-out;
                cursor: pointer;
                
                &:hover {
                    color: #2196f3;
                }
            }
        }
    }

`