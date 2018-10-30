import * as React from 'react';

import { Modal, ModalSize } from 'components/modal';
import { InnerContainer, Row, Col } from 'components/grid';
import { Text } from 'components/form';
import Icon from 'components/icon';

import Password from 'models/password';

interface IPasswordModalProps {
    password: Password | null;
    onClose: () => void;
}

interface IPasswordModalState {
    password: Password | null;
}

export default class PasswordModal extends React.Component<IPasswordModalProps, IPasswordModalState> {
    constructor(props) {
        super(props);

        this.state = {
            password: null
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ password: JSON.parse(JSON.stringify(props.password)) });
    }

    render() {
        const password = this.props.password;
        return <Modal
            visible={!!password}
            className='password-modal'
            onClose={this.props.onClose.bind(this)}
        >
            <div className='actions'>
                <Icon tooltip='Delete'>delete_outline</Icon>
                <Icon tooltip='Favourite'>star_outline</Icon>
                <Icon tooltip='Copy Username'>person</Icon>
                <Icon tooltip='Copy Password'>vpn_key</Icon>
            </div>
            <InnerContainer>
                <Row className='domain'>
                    <Col xs={12}>
                        <Text
                            label='Domain'
                            value={password ? password.domain : ''}
                            onChange={value => this.onChange('domain', value)}
                        />
                    </Col>
                </Row>
                <Row className='spacing-top'>
                    <Col xs={12}>
                        <Text
                            label='Password'
                            value={password ? password.password : ''}
                            onChange={value => this.onChange('password', value)}
                        />
                    </Col>
                </Row>
            </InnerContainer>
        </Modal>
    }

    onChange(key, value) {
        let password = this.state.password;
        if (!password)
            return;

        password[key] = value;
        this.setState({ password });
    }
}