import React from 'react';
import styled from 'styled-components';
import { CardInfo } from '@/model/card';
import { Step } from '@/model/ValueStream';
import { CreateCardArea } from './CreateCardArea';
import { useCardsOfStep } from '@/web/hooks/useCardsOfStep';
import { useDispatch } from 'react-redux';
import { createCard } from '@/web/redux/cards/cardsActions';
import { StepContent } from './StepContent';
import { deleteStep, setModifiedStep } from '@/web/redux/valueStream/valueStreamActions';
import { Separator } from '@/web/components/Separator';
import { MDropDown } from '@/web/components/MDropdown';
import { MMenu, MenuItem } from '@/web/components/MMenu';
import { ClickParam } from 'antd/es/menu';


interface StepViewProps {
    streamId: string,
    step: Step,
    canCreateCard?: boolean
}
export const StepView: React.FC<StepViewProps> = React.memo(props => {
    const { streamId, step, canCreateCard } = props
    const [showCreateBox, setShowCreateBox] = React.useState(false)

    const dispatch = useDispatch()
    const cards = useCardsOfStep(streamId, step.id)

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
        dispatch(deleteStep(streamId, step.id))
    }, [streamId, step.id])

    const onModifyStep = React.useCallback((e: ClickParam) => {
        dispatch(setModifiedStep(step))
    }, [step])

    const StepHeadStyle = React.useMemo<React.CSSProperties>(() => {
        if (step?.color) return { backgroundColor: step.color }
        return { backgroundColor: '#fff' }
    }, [step?.color])

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
                <div className="title">{step.name}</div>
                <div className="tools">
                    {
                        canCreateCard &&
                        <i className="add-card iconfont icon-plus"
                            onClick={onShowCreateBox}
                        />
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
            <StepContent stepId={step.id} cards={cards} />
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
            padding: 0 10px;
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