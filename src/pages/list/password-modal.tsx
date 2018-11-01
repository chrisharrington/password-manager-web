import * as React from 'react';

import { Modal } from 'components/modal';
import { InnerContainer, Row, Col } from 'components/grid';
import { Text, PrimaryButton, SecondaryButton } from 'components/form';

import Password from 'models/password';
import PasswordService from 'data/password';

import { Value, Rules } from 'utilities/validation';

interface IPasswordModalProps {
    
}

interface IPasswordModalState {
    visible: boolean;
    mode: Mode;
    values: IPasswordValidation;
}

enum Mode {
    Add,
    Edit
}

interface IPasswordValidation {
    domain: Value;
    username: Value;
    password: Value;
}

export default class PasswordModal extends React.Component<IPasswordModalProps, IPasswordModalState> {
    constructor(props) {
        super(props);

        this.state = this.defaultState();
    }

    defaultState() {
        return {
            visible: false,
            mode: Mode.Add,

            values: {
                domain: new Value('domain', Rules.Required),
                username: new Value('username', Rules.Required),
                password: new Value('password', Rules.Required)
            }
        }
    }

    render() {
        const values = this.state.values;
        return <Modal
            title={this.state.mode === Mode.Edit ? values.domain.get() : 'New Password'}
            visible={this.state.visible}
            className='password-modal'
            onClose={this.onClose.bind(this)}
        >
            <InnerContainer>
                <Row className='domain'>
                    <Col xs={12}>
                        <Text
                            label='Domain'
                            value={values.domain.get()}
                            onChange={value => this.onChange('domain', value)}
                            error={values.domain.error()}
                        />
                    </Col>
                </Row>
                <Row className='spacing-top'>
                    <Col xs={12}>
                        <Text
                            label='Username'
                            value={values.username.get()}
                            onChange={value => this.onChange('username', value)}
                            error={values.username.error()}
                        />
                    </Col>
                </Row>
                <Row className='spacing-top'>
                    <Col xs={12}>
                        <Text
                            label='Password'
                            value={values.password.get()}
                            onChange={value => this.onChange('password', value)}
                            error={values.password.error()}
                        />
                    </Col>
                </Row>
                <Row className='spacing-top-large'>
                    <Col xs={2} xsOffset={8}>
                        <SecondaryButton
                            label='Cancel'
                            onClick={this.onClose.bind(this)}
                        />
                    </Col>
                    <Col xs={2}>
                        <PrimaryButton
                            label={this.state.mode === Mode.Add ? 'Add' : 'Save'}
                            onClick={() => this.onSave()}
                        />
                    </Col>
                </Row>
            </InnerContainer>
        </Modal>;
    }

    add() {
        let state = this.defaultState();
        state.mode = Mode.Add;
        state.visible = true;
        this.setState(state);
    }

    edit(password: Password) {
        let state = this.defaultState();
        state.mode = Mode.Edit;
        state.visible = true;
        Object.keys(password).forEach(key => state.values[key] && state.values[key].set(password[key]));
        this.setState(state);
    }

    onClose() {
        this.setState(this.defaultState());
    }

    onChange(key, value) {
        let values = this.state.values;
        values[key] = value;
        this.setState({ values });
    }

    async onSave() {
        
    }
}