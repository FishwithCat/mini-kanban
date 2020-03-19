import React from 'react';
import styled from 'styled-components';
import { useValueStream } from '@/web/hooks/useValueStream';
import { useDispatch, useSelector } from 'react-redux';
import { generate } from 'shortid';
import { DropResult, DraggableLocation } from 'react-beautiful-dnd';
import { moveCard, setModifiedCard } from '@/web/redux/cards/cardsActions';
import { ModifyStepModal } from '../components/ModifyStep/ModifyStepModal';
import { updateStep, fetchValueStream, fetchValueStreamMembers, deleteStep, setStepToDelete } from '@/web/redux/valueStream/valueStreamActions';
import { Members } from '../components/Members';
import { MDrawer } from '@/web/components/MDrawer';
import { RootState } from '@/web/redux/create-store';
import { CardDetail } from '@/web/components/CardDetail';
import { MModal } from '@/web/components/MModal';
import { MTooltip } from '@/web/components/MTooltip';
import { ValueStreamInner } from './ValueStreamInner';
import { Dashboard } from '../dashboard';


interface ValueStreamProps {
    id: string
}
export const ValueStream: React.FC<ValueStreamProps> = React.memo(props => {
    const { id } = props

    const [showMembers, setShowMembers] = React.useState(false)
    const [showDashboard, setShowDashboard] = React.useState(false)
    const [filteredMember, setFilteredMember] = React.useState<string>()

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

    const onDragEnd = React.useCallback((result: DropResult) => {
        const { source, destination } = result
        if (!destination || _isSameLocation(source, destination)) return
        dispatch(moveCard(id,
            { stepId: source.droppableId, index: source.index },
            { stepId: destination.droppableId, index: destination.index }
        ))
    }, [id])

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
                    <MTooltip title="图表">
                        <i className={showDashboard ? 'active iconfont icon-barchart' : 'iconfont icon-barchart'}
                            onClick={() => setShowDashboard(prev => !prev)}
                        />
                    </MTooltip>
                    <MTooltip title="成员">
                        <i className={filteredMember ? 'active iconfont icon-team' : 'iconfont icon-team'}
                            onClick={() => setShowMembers(prev => !prev)}
                        />
                    </MTooltip>
                </div>
            </Menu>
            <div className="value-stream-content">
                {
                    !showDashboard ?
                        <ValueStreamInner
                            id={id}
                            valueStream={valueStream}
                            onDragEnd={onDragEnd}
                            filteredMember={filteredMember}
                            onCreateStep={onCreateStep}
                        />
                        : <Dashboard id={id} />

                }
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
                        filteredMember={filteredMember}
                        setFilteredMember={setFilteredMember}
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

            </div>
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

        > i {
            margin-left: 10px;
            transition: color .3s ease-out;

            &:hover, &.active {
                color: #2196f3;
            }

            &.icon-barchart {
                position: relative;
                top: 1px;
            }
        }
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