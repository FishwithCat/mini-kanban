import React from 'react';
import { Card } from '@/model/card';
import styled from 'styled-components';
import { DraggableProvided, DraggingStyle } from 'react-beautiful-dnd';
import { EmptyArray } from '@/model/empty';
import { MTooltip } from '@/web/components/MTooltip';
import { UserBaseInfo } from '@/model/user';
import { useValueStreamMembers } from '@/web/hooks/useValueStreamMembers';


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

    const getColor = (memberId: string) => {
        const memberInfo = members.find(member => member.id === memberId)
        return memberInfo?.color ?? '#333'
    }

    return (
        <Wrapper className="card-view" onClick={onClickCard}>
            <div className="content">
                <div className="title">{card.title}</div>
            </div>
            <MTooltip title={participants.map(member => member.name).join(', ')}>
                <div className="participants">
                    {
                        participants
                            .slice(0, 3)
                            .map((member: UserBaseInfo) => {
                                return <div className="name" style={{ color: getColor(member.id) }}>{member.name}</div>
                            })
                    }
                </div>
            </MTooltip>
        </Wrapper>
    )
})

const Wrapper = styled.div`
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 2px 0px rgba(0, 0, 0, .1);
    height: 100%;
    display: flex;
    padding: 10px;

    .content {
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

    .participants {
        flex-shrink: 0;
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

   
`