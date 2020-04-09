import React from 'react';
import { MButton } from '@/web/components/MButton';
import { MRangePicker } from '@/web/components/MDatePicker';
import styled from 'styled-components';
import dayjs, { Dayjs } from 'dayjs';
import { Period } from '@/model/time';
import { StepRange, Step } from '@/model/ValueStream';
import { BlockMSelect, Option } from '@/web/components/MSelect';
import { MRow, MCol } from '@/web/components/MForm';

export interface LeadTimeFilter {
    period: Period,
    stepRange: StepRange
}

interface FilterMenuProps {
    filter: LeadTimeFilter,
    steps: Step[],
    onChange(newFilter: LeadTimeFilter): void,
    onQuery(): void
}
export const FilterMenu: React.FC<FilterMenuProps> = React.memo(props => {
    const { filter, steps, onChange, onQuery } = props

    const startStepOptions = React.useMemo(() => {
        return steps.map((step, index) => {
            if (index === steps.length - 1) return { ...step, disabled: true }
            return { ...step, disabled: false }
        })
    }, [steps])

    const endStepOptions = React.useMemo(() => {
        const { stepRange } = filter
        const { startStepId } = stepRange
        const startStepIndex = steps.findIndex(step => step.id === startStepId)
        return steps.map((step, index) => {
            if (index <= startStepIndex) {
                return { ...step, disabled: true }
            }
            return { ...step, disabled: false }
        })
    }, [filter, steps])

    return (
        <FilterMenuWrapper className="filter-menu">
            <FormArea>
                <FormBlock className="form-block">
                    <FormTitle>创建时间</FormTitle>
                    <MRangePicker value={[dayjs(filter.period.start), dayjs(filter.period.end)]}
                        onChange={e => {
                            const start: Dayjs = e?.[0] ?? dayjs().subtract(14, 'day')
                            const end = e?.[1] ?? dayjs()
                            onChange({
                                ...filter,
                                period: {
                                    start: start.valueOf(),
                                    end: end.valueOf()
                                }
                            })
                        }}
                    />
                </FormBlock>

                <FormBlock className="step-range-area">
                    <FormTitle>步骤区间</FormTitle>
                    <FormIndentBlock>
                        <MRow>
                            <MCol flex="80px">
                                <FormSubTitle>起始步骤</FormSubTitle>
                            </MCol>
                            <MCol flex="auto">
                                <BlockMSelect value={filter.stepRange.startStepId}
                                    onChange={stepId => {
                                        const { stepRange } = filter
                                        const newStepRange = getNewStepRange(steps, stepId, stepRange.endStepId)
                                        onChange({
                                            ...filter,
                                            stepRange: newStepRange
                                        })
                                    }}
                                >
                                    {
                                        startStepOptions.map(option => (
                                            <Option key={option.id} value={option.id} disabled={option.disabled}>{option.name}</Option>
                                        ))
                                    }
                                </BlockMSelect>
                            </MCol>
                        </MRow>
                        <MRow>
                            <MCol flex="80px">
                                <FormSubTitle>结束步骤</FormSubTitle>
                            </MCol>
                            <MCol flex="auto">
                                <BlockMSelect value={filter.stepRange.endStepId}
                                    onChange={stepId => {
                                        const { stepRange } = filter
                                        const newStepRange = getNewStepRange(steps, stepRange.startStepId, stepId)
                                        onChange({
                                            ...filter,
                                            stepRange: newStepRange
                                        })
                                    }}
                                >
                                    {
                                        endStepOptions.map(option => (
                                            <Option key={option.id} value={option.id} disabled={option.disabled}>{option.name}</Option>
                                        ))
                                    }
                                </BlockMSelect>
                            </MCol>
                        </MRow>
                    </FormIndentBlock>
                </FormBlock>
            </FormArea>
            <MButton onClick={onQuery}> 绘制 </MButton>
        </FilterMenuWrapper>
    )
})

const getNewStepRange = (steps: Step[], startStepId: string, endStepId: string): StepRange => {
    const startStepIndex = steps.findIndex(step => step.id === startStepId)
    const endStepIndex = steps.findIndex(step => step.id === endStepId)
    if (startStepIndex >= endStepIndex) {
        return {
            startStepId: startStepId,
            endStepId: steps[steps.length - 1].id
        }
    }
    return {
        startStepId: startStepId,
        endStepId: endStepId
    }
}

const FilterMenuWrapper = styled.div`
    padding: 10px;
`

const FormArea = styled.div`
    margin-bottom: 10px;

    .form-block:last-child {
        margin-bottom: 0;
    }

    .step-range-area {
        .ant-row {
            margin-bottom: 10px;
        }
    }
`

const FormBlock = styled.div`
    margin-bottom: 10px;
`

const FormIndentBlock = styled.div`
    margin-left: 20px;
`

const FormTitle = styled.div`
    margin-bottom: 8px;
    color: #8e8e8e;
`

const FormSubTitle = styled.div`
    color: #8e8e8e;
    line-height: 32px;
`