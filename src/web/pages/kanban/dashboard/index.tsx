import React from 'react';
import { MTabs, MTabPane } from '@/web/components/MTabs';
import styled from 'styled-components';
import { LeadTime } from './LeadTime';

interface DashboardProps {
    id: string
}
export const Dashboard: React.FC<DashboardProps> = React.memo(props => {
    const { id } = props

    return (
        <DashBardWrapper className="dashboard">
            <MTabs tabPosition="left">
                <MTabPane tab="周期分布" key="leadtime">
                    <LeadTime streamId={id} />
                </MTabPane>
                {/* <MTabPane tab="吞吐量" key="throughput">

                </MTabPane> */}
            </MTabs>
        </DashBardWrapper>
    )
})

const DashBardWrapper = styled.div`
    height: 100%;
    background-color: #fff;

    .ant-tabs, .ant-tabs-content, .ant-tabs-tabpane {
        height: 100%;
    }

    .ant-tabs-content {
        padding: 0px;
    }

`