import React from 'react';
import styled from 'styled-components';
import { MTextArea } from './MTextArea';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Delta = any

interface MEditorProps {
    defaultValue: Delta | undefined,
    modules: any,
    style?: React.CSSProperties,
    onChange(newValue: Delta): void
}
export const MEditor: React.FC<MEditorProps> = React.memo(props => {

    const { defaultValue, modules, style } = props

    return (
        <StyledReactQuill
            defaultValue={defaultValue}
            theme="snow"
            modules={modules}
            style={style}
            onChange={
                (content, delta, source, editor) => {
                    props.onChange(editor.getContents())
                }
            }
        />
    )
})

const StyledReactQuill = styled(ReactQuill)`
    .ql-container {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        font-size: 14px;
        height: auto;
        overflow: auto;
    }
    .ql-toolbar {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    .ql-stroke {
        stroke: #8c8c8c;
    }

    .ql-fill,  .ql-stroke.ql-fill {
        fill: #8c8c8c;
    }
`
