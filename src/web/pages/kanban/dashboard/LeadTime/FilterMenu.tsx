import React from 'react';
import { MRangePicker } from '@/web/components/MDatePicker';
import styled from 'styled-components';


export const FilterMenu = React.memo(props => {
    return (
        <FilterMenuWrapper className="filter-menu">
            <FormTitle>起止时间</FormTitle>
            <MRangePicker />
        </FilterMenuWrapper>
    )
})

const FilterMenuWrapper = styled.div`
    padding: 10px;
`

const FormTitle = styled.div`
    margin-bottom: 5px;
    color: #8e8e8e;
`