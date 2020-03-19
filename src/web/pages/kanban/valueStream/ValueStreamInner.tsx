import React from 'react';
import { ValueStreamStruct } from '@/model/ValueStream';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { StepView } from './StepView';


interface ValueStreamInnerProps {
    id: string,
    valueStream: ValueStreamStruct | undefined,
    filteredMember: string | undefined,
    onDragEnd(dropResult: DropResult): void,
    onCreateStep(): void,
}
export const ValueStreamInner: React.FC<ValueStreamInnerProps> = React.memo(props => {
    const { id, valueStream, filteredMember, onDragEnd, onCreateStep } = props

    return (
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
                                    canCreateCard={index === 0}
                                    filteredMember={filteredMember}
                                />
                            ))
                        }

                        <div className="create-step-btn" >
                            <span onClick={onCreateStep}>新建步骤</span>
                        </div>
                    </div>
                </DragDropContext>
            }
        </div>
    )
})