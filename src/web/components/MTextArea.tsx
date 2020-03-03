import React from 'react';
import Input, { TextAreaProps } from 'antd/es/input';
import 'antd/es/input/style';
const { TextArea } = Input


export const MTextArea: React.FC<TextAreaProps> = React.memo(props => {
    return (
        <TextArea {...props} />
    )
})