import React from 'react';
import { MBarChart, BarData } from '@/web/components/MBarChart';
import styled from 'styled-components';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FilterMenu, LeadTimeFilter } from './FilterMenu';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeadTimeData } from '@/web/redux/statistic/statisticActions';
import { BaseQuery } from '@/model/query';
import { RootState } from '@/web/redux/create-store';
import { useValueStream } from '@/web/hooks/useValueStream';
import { EmptyArray } from '@/model/empty';
import { Step } from '@/model/ValueStream';

const getDefaultLeadTImeFilter = (steps: Step[]): LeadTimeFilter => {
    return {
        period: {
            start: dayjs().subtract(14, 'day').valueOf(),
            end: dayjs().valueOf()
        },
        stepRange: {
            startStepId: steps[0].id,
            endStepId: steps[steps.length - 1].id
        }
    }
}

interface LeadTimeProps {
    streamId: string
}
export const LeadTime: React.FC<LeadTimeProps> = React.memo(props => {
    const { streamId } = props
    const valueStreamStruct = useValueStream(streamId)
    const steps = valueStreamStruct?.steps ?? EmptyArray
    const leadTimeData = useSelector((state: RootState) => state.statisticReducer.leadTimeData)

    const [filter, setFilter] = React.useState<LeadTimeFilter>(getDefaultLeadTImeFilter(steps))

    const dispatch = useDispatch()

    const onQuery = React.useCallback(() => {
        const query = new BaseQuery(filter.period, filter.stepRange)
        dispatch(fetchLeadTimeData(streamId, query))
    }, [streamId, filter])

    const data = React.useMemo(() => {
        let chartData: BarData[] = []
        const { data: chart } = leadTimeData
        for (let key in chart) {
            chartData = chartData.concat({
                label: key,
                value: chart[key].length
            })
        }
        return chartData
    }, [leadTimeData])

    return (
        <LeadTimeWrapper className="lead-time-view">
            <FilterMenu steps={steps} filter={filter} onChange={setFilter} onQuery={onQuery} />
            <div className="chart-area">
                <AutoSizer>
                    {
                        ({ width, height }) => (
                            <MBarChart data={data}
                                width={width}
                                height={height}
                                margin={{ top: 30, right: 40, bottom: 30, left: 40 }}
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