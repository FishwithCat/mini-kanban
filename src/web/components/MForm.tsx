import React from 'react';
import Row, { RowProps } from 'antd/es/row';
import Col, { ColProps } from 'antd/es/col';
import 'antd/es/row/style';
import 'antd/es/col/style';

export const MRow: React.FC<RowProps> = React.memo(props => {
    const { children, ...restProps } = props
    return (
        <Row {...restProps}>
            {props.children}
        </Row>
    )
})

export const MCol: React.FC<ColProps> = React.memo(props => {
    const { children, ...restProps } = props
    return (
        <Col {...restProps}>
            {props.children}
        </Col>
    )
})
