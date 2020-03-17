import React from 'react';
import styled from 'styled-components';
import { MTextArea } from '../MTextArea';

interface EditableTextPayload {
    className?: string,
    value: string | undefined,
    onChange(newValue: string | undefined): void
}
export const EditableText: React.FC<EditableTextPayload> = React.memo(props => {
    const { className, value, onChange } = props
    const [editMode, setEditMode] = React.useState(false)

    const onFinishEdit = (e: any) => {
        onChange(e.target.value)
        setEditMode(false)
    }

    return (
        <Wrapper className={className ? `${className} editable-text` : "editable-text"}>
            {
                editMode ?
                    <StyledTextArea className="edit-area" defaultValue={value} autoFocus autoSize
                        onBlur={onFinishEdit}
                        onFocus={e => e.target.setSelectionRange(-1, -1)}
                        onPressEnter={onFinishEdit}
                    />
                    :
                    <React.Fragment>
                        <text className="content">{value}</text>
                        <i className="iconfont icon-edit-square" onClick={() => setEditMode(true)} />
                    </React.Fragment>
            }
        </Wrapper>
    )
})

const Wrapper = styled.div`
    .icon-edit-square {
        color: #ddd;
        margin-left: 10px;
        cursor: pointer;
        transition: color .3s ease-out;

        &:hover {
            color: #2196f3;
        }

    }
`

const StyledTextArea = styled(MTextArea)`
    border: none;
    line-height: 1.5715;
    padding: 0;
    background-color: transparent;
    resize: none;

    &.ant-input:hover, &.ant-input:focus {
        border: none;
        box-shadow: none;
    }
`