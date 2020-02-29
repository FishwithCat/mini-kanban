import React from 'react';
import { Card } from '@/model/card';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { FixedSizeList, areEqual } from "react-window";
import { DraggableCardView } from './CardView';


interface StepContentProps {
    stepId: string
    cards: Card[]
}
export const StepContent: React.FC<StepContentProps> = React.memo(props => {
    const { stepId, cards } = props

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
                                            itemSize={68}
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

interface RowProps {
    data: Card[],
    index: number,
    style?: React.CSSProperties
}
const Row = React.memo((props: RowProps) => {
    const { data, index, style } = props
    const card = data[index];

    if (!card) return null;

    return (
        <Draggable draggableId={card.id} index={index} key={card.id}>
            {provided => <DraggableCardView provided={provided} item={card} style={style} />}
        </Draggable>
    )
}, areEqual)