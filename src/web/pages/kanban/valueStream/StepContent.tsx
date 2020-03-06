import React from 'react';
import { Card } from '@/model/card';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { FixedSizeList, areEqual } from "react-window";
import { DraggableCardView } from './CardView';
import { useDispatch } from 'react-redux';
import { setModifiedCard } from '@/web/redux/cards/cardsActions';


interface RowProps {
    data: Card[],
    index: number,
    style?: React.CSSProperties
}

interface StepContentProps {
    stepId: string
    streamId: string,
    cards: Card[]
}
export const StepContent: React.FC<StepContentProps> = React.memo(props => {
    const { streamId, stepId, cards } = props

    const dispatch = useDispatch()

    const onClickCard = React.useCallback(
        (cardId) => {
            dispatch(setModifiedCard(streamId, cardId))
        },
        [streamId]
    )

    const Row = React.useCallback((props: RowProps) => {
        const { data, index, style } = props
        const card = data[index];

        return card ? (
            <Draggable draggableId={card.id} index={index} key={card.id}>
                {
                    provided => (
                        <DraggableCardView
                            provided={provided}
                            streamId={streamId}
                            item={card}
                            style={style}
                            onClick={onClickCard}
                        />
                    )
                }
            </Draggable>
        ) : null
    }, [onClickCard])

    return (
        <div className="step-content">
            {
                <AutoSizer>
                    {
                        ({ width, height }) => (
                            <Droppable
                                droppableId={stepId}
                                mode="virtual"
                                renderClone={(provided, snapshot, rubric) => (
                                    <DraggableCardView
                                        streamId={streamId}
                                        provided={provided}
                                        isDragging={snapshot.isDragging}
                                        item={cards[(rubric as any).source.index]}
                                    />
                                )}
                            >
                                {(provided, snapshot) => {
                                    return (
                                        <FixedSizeList
                                            className="scroll-list"
                                            height={height}
                                            itemCount={cards.length}
                                            itemSize={89}
                                            width={width}
                                            outerRef={provided.innerRef}
                                            itemData={cards}
                                        >
                                            {Row}
                                        </FixedSizeList>
                                    )
                                }}
                            </Droppable>
                        )
                    }
                </AutoSizer>
            }
        </div>
    )
})