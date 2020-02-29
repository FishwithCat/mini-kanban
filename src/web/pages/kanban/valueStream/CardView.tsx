import React from 'react';
import { Card } from '@/model/card';
import styled from 'styled-components';
import { DraggableProvided, DraggingStyle } from 'react-beautiful-dnd';
import { EmptyArray } from '@/model/empty';

interface CardViewProps {
    card: Card
}
export const CardView: React.FC<CardViewProps> = React.memo(props => {
    const { card } = props

    return (
        <Wrapper className="card-view">
            <div className="title">{card.title}</div>
            <div>{
                (card.participants ?? EmptyArray).map(member => {
                    return <span style={{ float: 'left' }}>{member.name}</span>
                })
            }</div>
        </Wrapper>
    )
})

interface DraggableCardViewProps {
    provided: DraggableProvided,
    item: Card,
    isDragging?: boolean,
    style?: React.CSSProperties
}
export const DraggableCardView: React.FC<DraggableCardViewProps> = React.memo(props => {
    const { provided, item, style, isDragging } = props

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
            <CardView card={item} />
        </div>
    )
})

const Wrapper = styled.div`
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 2px 0px rgba(0, 0, 0, .1);
    height: 100%;

    .title {
        padding: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`