import React from 'react';
import { ValueStreamBaseInfo } from '@/model/ValueStream';
import { MInput } from '../MInput';
import styled from 'styled-components';
import { MButton } from '../MButton';


interface ModifyValueStreamProps {
    valueStream: ValueStreamBaseInfo,
    onSave(valueStream: ValueStreamBaseInfo): void
}
export const ModifyValueStream: React.FC<ModifyValueStreamProps> = React.memo(props => {
    const { valueStream, onSave } = props

    const [name, setName] = React.useState(valueStream.name)

    return <Wrapper>
        <h2 className="title">
            {
                valueStream.id === '' ? '新建看板' : '编辑看板'
            }
        </h2>
        <MInput className="name" value={name} onChange={e => setName(e.target.value)} />
        <MButton type="primary" block onClick={e => {
            onSave({
                id: valueStream.id,
                name
            })
        }}>
            保 存
        </MButton>
    </Wrapper>
})

const Wrapper = styled.div`
    width: 250px;

    > h2 {
        font-weight: 300;
        font-size: 18px;
    }

    .name { 
        margin-bottom: 20px;
    }

`