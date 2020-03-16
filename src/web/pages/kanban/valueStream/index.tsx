import React from 'react';
import styled from 'styled-components';
import { useValueStream } from '@/web/hooks/useValueStream';
import { useDispatch, useSelector } from 'react-redux';
import { generate } from 'shortid';
// import { updateSteps } from '@/web/redux/valueStream/valueStreamActions';
import { StepView } from './StepView';
import { DragDropContext, DropResult, DraggableLocation } from 'react-beautiful-dnd';
import { moveCard, setModifiedCard } from '@/web/redux/cards/cardsActions';
import { ModifyStepModal } from '../components/ModifyStep/ModifyStepModal';
import { updateStep, fetchValueStream, fetchValueStreamMembers, deleteStep, setStepToDelete } from '@/web/redux/valueStream/valueStreamActions';
import { Members } from '../components/Members';
import { MDrawer } from '@/web/components/MDrawer';
import { RootState } from '@/web/redux/create-store';
import { CardDetail } from '@/web/components/CardDetail';
import { MModal } from '@/web/components/MModal';
import { MTooltip } from '@/web/components/MTooltip';


interface ValueStreamProps {
    id: string
}
export const ValueStream: React.FC<ValueStreamProps> = React.memo(props => {
    const { id } = props

    const [showMembers, setShowMembers] = React.useState(false)

    const dispatch = useDispatch()
    const valueStream = useValueStream(id)

    const modifiedCardInfo = useSelector((state: RootState) => state.cardsReducer.modifiedCard)
    const stepToDelete = useSelector((state: RootState) => state.valueStreamReducer.stepToDelete)

    const onCreateStep = React.useCallback(() => {
        dispatch(updateStep(id, {
            id: generate(),
            name: '新步骤'
        }))
    }, [id])

    const onDeleteStep = React.useCallback(() => {
        if (!stepToDelete) return
        dispatch(deleteStep(id, stepToDelete.id))
    }, [id, stepToDelete])

    const onCancelDeleteStep = React.useCallback(() => {
        dispatch(setStepToDelete(null))
    }, [])

    const onCloseModifiedCardModal = React.useCallback(() => {
        dispatch(setModifiedCard(id, null))
    }, [id])

    const _isSameLocation = (source: DraggableLocation, dest: DraggableLocation) => {
        const { droppableId: sourceId, index: sourceIndex } = source
        const { droppableId: destId, index: destIndex } = dest
        return sourceId === destId && sourceIndex === destIndex
    }

    const onDragEnd = React.useCallback(
        (result: DropResult) => {
            const { source, destination } = result
            if (!destination || _isSameLocation(source, destination)) return
            dispatch(moveCard(id,
                { stepId: source.droppableId, index: source.index },
                { stepId: destination.droppableId, index: destination.index }
            ))
        },
        [id]
    )

    React.useEffect(() => {
        dispatch(fetchValueStream(id))
        dispatch(fetchValueStreamMembers(id))
    }, [id])

    return (
        <Wrapper className="value-stream">
            <Menu className="menu">
                <div className="left">
                </div>
                <div className="right">
                    <MTooltip title="成员">
                        <i className="iconfont icon-team" onClick={() => setShowMembers(true)} />
                    </MTooltip>
                </div>
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
                <MDrawer
                    closable={false}
                    visible={showMembers}
                    onClose={() => setShowMembers(false)}
                    getContainer={false}
                    style={{ position: 'absolute' }}
                    destroyOnClose
                >
                    <Members
                        streamId={id}
                    />
                </MDrawer>
                <VisibleDrawer
                    visible={Boolean(modifiedCardInfo)}
                    onClose={onCloseModifiedCardModal}
                    placement="right"
                    width="500"
                    closable={false}
                    destroyOnClose
                >
                    {
                        modifiedCardInfo &&
                        <CardDetail streamId={modifiedCardInfo.streamId}
                            cardId={modifiedCardInfo.cardId}
                        />
                    }
                </VisibleDrawer>
                <MModal visible={Boolean(stepToDelete)}
                    onOk={onDeleteStep}
                    onCancel={onCancelDeleteStep}
                    okText='删除'
                    cancelText='取消'
                    okType="danger"
                >
                    {
                        stepToDelete &&
                        <DeleteStepWrapper>
                            <h2>
                                确认删除 {stepToDelete.name} ?
                            </h2>
                            <div>
                                步骤下卡片可能会丢失
                            </div>
                        </DeleteStepWrapper>

                    }
                </MModal>
            </div>
            <ModifyStepModal streamId={id} />
        </Wrapper>
    )
})

const Menu = styled.div`
    height: 32px;
    line-height: 32px;
    background: #fff;
    padding: 0 20px;
    display: flex;

    .left, .right {
        flex: 1;
    }
    
    .right {
        text-align: right;
    }


    i {
        font-size: 20px;
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
        background-color: #fafafa;
        overflow: hidden;

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

const DeleteStepWrapper = styled.div`
    h2 {
        font-weight: 400;
    }
`

const VisibleDrawer = styled(MDrawer)`
    .ant-drawer-content,
    .ant-drawer-body {
        overflow: visible
    }
`