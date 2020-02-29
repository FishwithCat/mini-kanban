import React from 'react';
import styled from 'styled-components';
import { CardInfo } from '@/model/card';
import { Step } from '@/model/ValueStream';
import { CreateCardArea } from './CreateCardArea';
import { useCardsOfStep } from '@/web/hooks/useCardsOfStep';
import { useDispatch } from 'react-redux';
import { createCard } from '@/web/redux/cards/cardsActions';
import { StepContent } from './StepContent';
import withStyles from '@material-ui/core/styles/withStyles';
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
import { deleteStep, setModifiedStep } from '@/web/redux/valueStream/valueStreamActions';


interface StepViewProps {
    streamId: string,
    step: Step,
    canCreateCard?: boolean
}
export const StepView: React.FC<StepViewProps> = React.memo(props => {
    const { streamId, step, canCreateCard } = props
    const [showCreateBox, setShowCreateBox] = React.useState(false)
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(menuAnchorEl);

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

    const onCloseMenu = React.useCallback(() => setMenuAnchorEl(null), [])

    const onDeleteStep = React.useCallback(() => {
        dispatch(deleteStep(streamId, step.id))
        setMenuAnchorEl(null)
    }, [streamId, step.id])

    const onModifyStep = React.useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        dispatch(setModifiedStep(step, { x: e.clientX, y: e.clientY }))
        setMenuAnchorEl(null)
    }, [step])

    const StepHeadStyle = React.useMemo<React.CSSProperties>(() => {
        if (step?.color) return { backgroundColor: step.color }
        return { backgroundColor: '#fff' }
    }, [step?.color])

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
                    <i className="more iconfont icon-ellipsis"
                        onClick={(event: React.MouseEvent<HTMLElement>) => setMenuAnchorEl(event.currentTarget)}
                    />
                </div>
            </div >
            {
                canCreateCard &&
                <CreateCardArea stepId={step.id}
                    showCreateBox={showCreateBox}
                    onSave={onCreateCard}
                    onCancel={onCancelCreate}
                />
            }
            <StepContent stepId={step.id} cards={cards} />

            <StyledMenu
                anchorEl={menuAnchorEl}
                keepMounted
                open={open}
                onClose={onCloseMenu}
                TransitionComponent={Fade}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <MenuItem onClick={onModifyStep}>
                    <i className="iconfont icon-edit" />
                    <div className="name">编辑步骤</div>
                </MenuItem>

                <Separator />

                <MenuItem className="danger" onClick={onDeleteStep}>
                    <i className="iconfont icon-delete" />
                    <div className="name">删除步骤</div>
                </MenuItem>
            </StyledMenu>
        </Wrapper >
    )
})

const StyledMenu = withStyles(() => ({
    paper: {
        border: 'none',
        boxShadow: '0 2px 20px rgba(0,0,0,0.1)'
    },
    list: {
        padding: '5px 0'
    }
}))(Menu)


const MenuItem = styled.li`
    display: flex;
    cursor: pointer;
    outline: none;
    line-height: 32px;
    height: 32px;
    padding: 0 16px;

    &.danger {
        color: #f44336;
    }

    > i { 
        font-size: 14px;
        margin-right: 8px;
        transition: color .2s ease-out;
    }

    &:hover {
        background-color: #f7f7f7;

        &:not(.danger) i {
            color: #2196f3;
        }
    }
`

const Separator = styled.li`
    border-top: 1px solid #e5e5e5;
    margin: 2px 5px;
    display: block;
    list-style: none;
    height: 0;
`

const Wrapper = styled.div`
    width: 240px;
    display: flex;
    flex-direction: column;
    margin: 0 5px;
    border-radius: 2px;
    overflow: hidden;
    background-color: #f5f5f5;

    > .step-head {
        padding: 6px 0;
        background-color: #fff;
        letter-spacing: 1px;
        box-shadow: 0 1px 3px 0px rgba(0, 0, 0, .1);
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