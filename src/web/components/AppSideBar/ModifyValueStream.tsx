import React from 'react';
import { ValueStreamBaseInfo } from '@/model/ValueStream';
import { MInput } from '../MInput';
import styled from 'styled-components';
import { MButton } from '../MButton';
import { MPopConfirm } from '../MPopConfirm';
import { useDispatch } from 'react-redux';
import { deleteValueStream } from '@/web/redux/valueStream/valueStreamActions';


interface ModifyValueStreamProps {
    valueStream: ValueStreamBaseInfo,
    onSave(valueStream: ValueStreamBaseInfo): void
}
export const ModifyValueStream: React.FC<ModifyValueStreamProps> = React.memo(props => {
    const { valueStream, onSave } = props

    const [name, setName] = React.useState(valueStream.name)
    const dispatch = useDispatch()


    const onDeleteValueStream = React.useCallback(() => {
        dispatch(deleteValueStream(valueStream.id))
    }, [valueStream.id])

    return <Wrapper>
        <h2 className="title">
            {
                valueStream.id === '' ? '新建看板' : '编辑看板'
            }
        </h2>

        <MPopConfirm
            title="确定删除当前看板?"
            onConfirm={onDeleteValueStream}
            okText="确定"
            cancelText="取消"
        >
            <i className="iconfont icon-delete" />
        </MPopConfirm>

        <MInput className="name" value={name} onChange={e => setName(e.target.value)} />
        <MButton type="primary" onClick={e => {
            onSave({
                id: valueStream.id,
                name
            })
        }} block>
            保 存
        </MButton>
    </Wrapper>
})

const Wrapper = styled.div`
    width: 250px;

    > h2 {
        font-weight: 400;
        font-size: 16px;
    }

    .name { 
        margin-bottom: 20px;
    }

    .icon-delete {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        transition: color .3s ease-out;

        &:hover {
            color: #ff7875;
        }
    }
`