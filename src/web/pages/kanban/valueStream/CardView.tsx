import React from 'react';
import { Card, Priority } from '@/model/card';
import styled from 'styled-components';
import { DraggableProvided, DraggingStyle } from 'react-beautiful-dnd';
import { EmptyArray } from '@/model/empty';
import { MTooltip } from '@/web/components/MTooltip';
import { UserBaseInfo } from '@/model/user';
import { useValueStreamMembers } from '@/web/hooks/useValueStreamMembers';
import dayjs from 'dayjs'
import { priorityColorMap } from '@/web/utils/colors';



interface DraggableCardViewProps {
    provided: DraggableProvided,
    streamId: string,
    item: Card,
    isDragging?: boolean,
    style?: React.CSSProperties,
    onClick?(cardId: string): void
}
export const DraggableCardView: React.FC<DraggableCardViewProps> = React.memo(props => {
    const { provided, streamId, item, style, isDragging, onClick } = props

    const BoxStyled = React.useMemo(() => {
        const grid = 6
        const combined: DraggingStyle | React.CSSProperties = {
            ...provided.draggableProps.style,
            ...style,
        }
        return {
            ...combined,
            height: isDragging ? combined.height : (combined.height as number) - grid,
            marginBottom: grid,
            padding: '0 7px',
            outline: 'none'
        }
    }, [provided.draggableProps.style, style, isDragging])


    return (
        <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={BoxStyled}
            className={`${isDragging ? "is-dragging" : ""}`}
        >
            <CardView streamId={streamId} card={item} onClick={onClick} />
        </div>
    )
})

interface CardViewProps {
    streamId: string,
    card: Card,
    onClick?(cardId: string): void
}
export const CardView: React.FC<CardViewProps> = React.memo(props => {
    const { streamId, card, onClick } = props
    const members = useValueStreamMembers(streamId)

    const onClickCard = React.useCallback(() => {
        onClick && onClick(card.id)
    }, [card, onClick])

    const participants = React.useMemo(() => {
        return card.participants ?? EmptyArray
    }, [card])

    const getMemberColor = (memberId: string) => {
        const memberInfo = members.find(member => member.id === memberId)
        return memberInfo?.color ?? '#333'
    }

    const getPriorityColor = (priority: Priority): string => {
        return priorityColorMap[priority]
    }

    const blockMessage = React.useMemo(() => {
        const { timeLine } = card
        if (!timeLine || timeLine.length < 1) return { color: 'transparent', message: null }
        const count = Math.abs(new Date().valueOf() - timeLine[timeLine.length - 1].timeStamp) / 1000 / 86400
        let color = '#333'
        if (count > 7) color = '#ff9800'
        else if (count > 14) color = '#f44336'
        return {
            color,
            message: count >= 1 ? `${Math.floor(count)}天` : null
        }
    }, [card.timeLine])

    return (
        <Wrapper className="card-view" onClick={onClickCard}
            style={{ borderLeft: `4px solid ${getPriorityColor(card.priority ?? Priority.default)}` }}
        >
            <div className="left">
                <div className="title">{card.title}</div>
            </div>
            <div className="right">
                <MTooltip title="停留时间">
                    <div className="block-time" style={{ color: blockMessage.color }}>
                        {
                            blockMessage.message
                        }
                    </div>
                </MTooltip>
                <MTooltip title={participants.map(member => member.name).join(', ')}>
                    <div className="participants">
                        {
                            participants
                                .slice(0, 2)
                                .map((member: UserBaseInfo) => (
                                    <div key={member.id} className="name" style={{ color: getMemberColor(member.id) }}>{member.name}</div>
                                ))
                        }
                    </div>
                </MTooltip>
            </div>

        </Wrapper>
    )
})

const Wrapper = styled.div`
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 1px 2px 0px rgba(0, 0, 0, .1);
    height: 100%;
    display: flex;
    padding: 10px;
    border-radius: 4px;
    box-sizing: border-box;

    &:hover {
        background-color: #fafafa;
    }

    .left {
        flex: 1;
        overflow: hidden;

         .title {
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 21px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
    }

    .right {
        flex-shrink: 0;

        .block-time {
            text-align: right;
            line-height: 20px;
            font-size: 12px;
            margin-left: 5px;
        }

        .participants {
            overflow: hidden;
            text-align: right;

            .name {
                border-radius: 4px;
                line-height: 20px;
                height: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
   
`