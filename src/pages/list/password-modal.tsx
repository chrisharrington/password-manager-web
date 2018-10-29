import * as React from 'react';

import { Modal, ModalSize } from 'components/modal';

import Password from 'models/password';

interface IPasswordModalProps {
    password: Password | null;
    onClose: () => void;
}

interface IPasswordModalState {
    
}

export default class PasswordModal extends React.Component<IPasswordModalProps, IPasswordModalState> {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        const password = this.props.password;
        return <Modal
            visible={!!password}
            onClose={this.props.onClose.bind(this)}
            title={password ? password.domain : ''}>
            the password modal
        </Modal>
    }
}