import React from 'react';
import { MRangePicker } from '@/web/components/MDatePicker';
import styled from 'styled-components';
import dayjs, { Dayjs } from 'dayjs';
import { Period } from '@/model/time';
import Button from 'antd/es/button';

export interface LeadTimeFilter {
    period: Period
}

interface FilterMenuProps {
    filter: LeadTimeFilter,
    onChange(newFilter: LeadTimeFilter): void,
    onQuery(): void
}
export const FilterMenu: React.FC<FilterMenuProps> = React.memo(props => {
    const { filter, onChange, onQuery } = props

    return (
        <FilterMenuWrapper className="filter-menu">
            <FormArea>
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
            </FormArea>
            <Button onClick={onQuery}> 绘制 </Button>
        </FilterMenuWrapper>
    )
})

const FilterMenuWrapper = styled.div`
    padding: 10px;
`

const FormArea = styled.div`
    margin-bottom: 10px
`

const FormTitle = styled.div`
    margin-bottom: 8px;
    color: #8e8e8e;
`