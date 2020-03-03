import React from 'react';
import Modal, { ModalProps } from 'antd/es/modal';
import 'antd/es/modal/style';


export const MModal: React.FC<ModalProps> = React.memo(props => {
    const { children, ...restProps } = props
    return (
        <Modal {...restProps}>
            {children}
        </Modal>
    )
})