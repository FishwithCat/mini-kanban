import React from 'react';
import styled from 'styled-components';
import { CardInfo } from '@/model/card';
import { Step } from '@/model/ValueStream';
import { CreateCardArea } from './CreateCardArea';
import { useCardsOfStep } from '@/web/hooks/useCardsOfStep';
import { useDispatch } from 'react-redux';
import { createCard, fetchCardsOfStep } from '@/web/redux/cards/cardsActions';
import { StepContent } from './StepContent';
import { deleteStep, setModifiedStep, setStepToDelete } from '@/web/redux/valueStream/valueStreamActions';
import { Separator } from '@/web/components/Separator';
import { MDropDown } from '@/web/components/MDropdown';
import { MMenu, MenuItem } from '@/web/components/MMenu';
import { ClickParam } from 'antd/es/menu';
import { MTooltip } from '@/web/components/MTooltip';
import { EmptyArray } from '@/model/empty';


interface StepViewProps {
    streamId: string,
    step: Step,
    canCreateCard?: boolean,
    filteredMember?: string
}
export const StepView: React.FC<StepViewProps> = React.memo(props => {
    const { streamId, step, canCreateCard, filteredMember } = props
    const [showCreateBox, setShowCreateBox] = React.useState(false)

    const dispatch = useDispatch()
    const cardsOfStep = useCardsOfStep(streamId, step.id)

    const cards = React.useMemo(() => {
        if (!filteredMember) return cardsOfStep
        return cardsOfStep.filter(card => {
            return (card.participants ?? EmptyArray).findIndex(userInfo => userInfo.id === filteredMember) >= 0
        })
    }, [cardsOfStep, filteredMember])


    const onShowCreateBox = React.useCallback(() => setShowCreateBox(true), [])

    const onCreateCard = React.useCallback(
        (card: CardInfo) => {
            dispatch(createCard(streamId, card))
            setShowCreateBox(false)
        },
        [streamId]
    )

    const onCancelCreate = React.useCallback(() => setShowCreateBox(false), [])

    const onDeleteStep = React.useCallback(() => {
        dispatch(setStepToDelete(step))
    }, [step])

    const onModifyStep = React.useCallback((e: ClickParam) => {
        dispatch(setModifiedStep(step))
    }, [step])

    const StepHeadStyle = React.useMemo<React.CSSProperties>(() => {
        if (step?.color) return { backgroundColor: step.color }
        return { backgroundColor: '#fff' }
    }, [step?.color])

    React.useEffect(() => {
        dispatch(fetchCardsOfStep(streamId, step.id))
    }, [step.id])

    const menu = (
        <MMenu>
            <StyledMenuItem onClick={onModifyStep}>
                <i className="iconfont icon-edit" />
                <div className="name">编辑步骤</div>
            </StyledMenuItem>

            <Separator />

            <StyledMenuItem className="danger" onClick={onDeleteStep}>
                <i className="iconfont icon-delete" />
                <div className="name">删除步骤</div>
            </StyledMenuItem>
        </MMenu>
    )

    return (
        <Wrapper className="step">
            <div className="step-head" style={StepHeadStyle}>
                <div className="title">
                    <div className="name">{step.name}</div>
                    <div className="badge">{cards.length}</div>
                </div>
                <div className="tools">
                    {
                        canCreateCard &&
                        <MTooltip title="新建卡片">
                            <i className="add-card iconfont icon-plus"
                                onClick={onShowCreateBox}
                            />
                        </MTooltip>
                    }
                    <MDropDown overlay={menu}>
                        <i className="more iconfont icon-ellipsis" />
                    </MDropDown>

                </div>
            </div >
            {
                canCreateCard &&
                <CreateCardArea streamId={streamId}
                    stepId={step.id}
                    showCreateBox={showCreateBox}
                    onSave={onCreateCard}
                    onCancel={onCancelCreate}
                />
            }
            <StepContent streamId={streamId} stepId={step.id} cards={cards} />
        </Wrapper >
    )
})

const StyledMenuItem = styled(MenuItem)`
    display: flex;

    > i {
        margin-right: 10px;
        flex-shrink: 0;
    }

    .name {
        flex: 1;
        text-align: center;
    }

    &:hover {
        color: #2196f3;
    }

    &.danger:hover {
        color: #ff4d4f;
    }
`


const Wrapper = styled.div`
    width: 240px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    margin: 0 5px;
    border-radius: 2px;
    overflow: hidden;
    background-color: #f5f5f5;

    > .step-head {
        padding: 6px 0;
        background-color: #fff;
        letter-spacing: 1px;
        box-shadow: 0 1px 3px 0px rgba(0, 0, 0, .2);
        z-index: 1;
        display: flex;

        > .title {
            flex: 1;
            display: flex;
            padding: 0 10px;
            overflow: hidden;

            .name {
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .badge {
                margin-left: 10px;
                flex-shrink: 0;
            }
        }

        > .tools {
            flex-shrink: 0;
            padding: 0 5px;

            > i {
                padding: 2px;
                transition: color .2s ease-out;
                cursor: pointer;

                &:hover {
                    color: #2196f3;
                }
            }
        }
    }

    > .step-content {
        flex: 1;
        padding-top: 6px;
        padding-bottom: 8px;
    }
`