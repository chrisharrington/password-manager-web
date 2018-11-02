import * as React from 'react';

import { Modal } from 'components/modal';
import { InnerContainer, Row, Col } from 'components/grid';
import { Text, PrimaryButton, SecondaryButton } from 'components/form';
import { FeedbackType } from 'components/feedback';

import Password from 'models/password';
import PasswordService from 'data/password';

import { Value, Rules } from 'utilities/validation';
import { KeyCodes } from 'utilities/constants';

interface IPasswordModalProps {
    onFeedback: (type: FeedbackType, message: string) => void;
    onSave: () => void;
}

interface IPasswordModalState {
    visible: boolean;
    mode: Mode;
    values: IPasswordValidation;
    title: string;
    loading: boolean;
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
    domain: Text;
    
    constructor(props) {
        super(props);

        this.state = this.defaultState();
    }

    defaultState() {
        return {
            visible: false,
            mode: Mode.Add,
            title: '',
            loading: false,

            values: {
                _id: new Value('_id'),
                domain: new Value('domain', Rules.Required),
                username: new Value('username', Rules.Required),
                password: new Value('password', Rules.Required)
            }
        }
    }

    render() {
        const values = this.state.values;
        return <Modal
            title={this.state.title}
            visible={this.state.visible}
            className='password-modal'
            onClose={this.onClose.bind(this)}
        >
            <div onKeyUp={this.onKeyUp.bind(this)}>
                <InnerContainer>
                    <Row className='domain'>
                        <Col xs={12}>
                            <Text
                                ref={c => this.domain = c as Text}
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
                                loading={this.state.loading}
                            />
                        </Col>
                    </Row>
                </InnerContainer>
            </div>
        </Modal>;
    }

    add() {
        let state = this.defaultState();
        state.mode = Mode.Add;
        state.visible = true;
        state.title = 'New Password';
        this.setState(state, () => {
            this.domain.focus();
        });
    }

    edit(password: Password) {
        let state = this.defaultState();
        state.mode = Mode.Edit;
        state.visible = true;
        state.title = password.domain;
        Object.keys(password).forEach(key => state.values[key] && state.values[key].set(password[key]));
        this.setState(state);

        this.domain.focus();
    }

    onClose() {
        this.setState(this.defaultState());
    }

    onChange(key, value) {
        let values = this.state.values;
        values[key].set(value);
        this.setState({ values });
    }

    async onKeyUp(e) {
        if (e.keyCode === KeyCodes.Enter)
            await this.onSave();
    }

    async onSave() {
        let errors = Object.keys(this.state.values).map(key => this.state.values[key].validate());
        if (errors.some(e => !!e)) {
            this.forceUpdate();
            return;
        }

        try {
            this.setState({ loading: true });

            let values = this.state.values,    
                password = new Password();
            
            Object.keys(values).forEach(key => password[key] = values[key].get());

            let response = await PasswordService.upsert(password);
            if (response.status !== 200)
                throw 'An unexpected error has occurred. Please try again later.';

            this.onClose();
            this.props.onSave();
        } catch (e) {
            this.props.onFeedback(FeedbackType.Error, e.toString());
        } finally {
            this.setState({ loading: false });
        }
    }
}