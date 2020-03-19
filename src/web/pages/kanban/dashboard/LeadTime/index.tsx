import React from 'react';
import { MBarChart } from '@/web/components/MBarChart';
import styled from 'styled-components';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FilterMenu } from './FilterMenu';

interface LeadTimeProps {

}
export const LeadTime: React.FC<LeadTimeProps> = React.memo(props => {
    const data = [
        { label: 1, value: 1 },
        { label: 2, value: 0 },
        { label: 3, value: 5 },
        { label: 4, value: 4 },
        { label: 5, value: 3 },
        { label: 6, value: 3 },
        { label: 7, value: 2 },
        { label: 8, value: 1 },
        { label: 9, value: 1 },
        { label: 10, value: 1 },
    ]

    return (
        <LeadTimeWrapper className="lead-time-view">
            <FilterMenu />
            <div className="chart-area">
                <AutoSizer>
                    {
                        ({ width, height }) => (
                            <MBarChart data={data}
                                width={width}
                                height={height}
                                margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
                                colors={['#2196f3']}
                            />
                        )
                    }
                </AutoSizer>
            </div>
        </LeadTimeWrapper>
    )
})

const LeadTimeWrapper = styled.div`
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;

    .filter-menu {
        border-right: 1px solid #f0f0f0;
    }

    .chart-area {
        flex: 1;
    }
`