import React from 'react';
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';

export interface BarData {
    label: string | number,
    value: number
}

interface MBarChartProps {
    data: BarData[],
    width: number,
    height: number,
    margin: { top: number, right: number, bottom: number, left: number }
    colors: string[]
}
export const MBarChart: React.FC<MBarChartProps> = React.memo(props => {
    const { data, width, height, margin, colors } = props

    const option = React.useMemo(() => {
        const categoryAxis = {
            type: 'category',
            data: data.map(item => item.label),
            axisLine: {
                show: false
            }
            // axisLabel: {
            //     formatter: (value: string, index: number) => limitText(value, 10, '...')
            // }
        }

        const valueAxis = {
            type: 'value',
            axisLine: { show: false },
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
        }

        return {
            color: colors,
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                    shadowStyle: {
                        color: "rgba(142, 142, 142, 0.1)"
                    }
                }
            },
            grid: {
                ...margin,
                containLabel: true
            },
            xAxis: [categoryAxis],
            yAxis: [valueAxis],
            series: [
                {
                    name,
                    type: 'bar',
                    barWidth: '60%',
                    barMaxWidth: '60',
                    data: data.map(item => item.value)
                }
            ]
        }
    }, [data, margin, colors])


    return (
        <ReactEchartsCore
            echarts={echarts}
            option={option}
            // onEvents={onEvents}
            style={{ height: `${height}px`, width: `${width}px` }}
        />
    )
})