import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Delta = any

interface MEditorProps {
    value?: Delta | undefined,
    defaultValue?: Delta | undefined,
    modules: any,
    style?: React.CSSProperties,
    onChange(newValue: Delta): void
}
export const MEditor: React.FC<MEditorProps> = React.memo(props => {

    const { value, defaultValue, modules, style } = props
    console.log('>>>>>value', value)

    const onChange = React.useCallback((content, delta, source, editor) => {
        props.onChange(editor.getContents())
    }, [props.onChange])

    return (
        <StyledReactQuill
            value={value ?? { ops: [{ insert: '' }] }}
            // defaultValue={defaultValue}
            theme="snow"
            modules={modules}
            style={style}
            onChange={onChange}
        />
    )
})

const StyledReactQuill = styled(ReactQuill)`
    .ql-container {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        font-size: 14px;
        height: auto;
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
    
    .ql-tooltip {
        box-shadow: 0 1px 2px 0px rgba(0, 0, 0, .1);
    }
`
