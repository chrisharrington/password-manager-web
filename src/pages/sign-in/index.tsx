import * as React from 'react';

import { InnerContainer, Row, Col } from 'components/grid';
import { Text, Password, PrimaryButton } from 'components/form';
import { Feedback, FeedbackType } from 'components/feedback';

import { Value, Rules } from 'utilities/validation';

import UserService from 'data/user';

import './style.scss';

interface ISignInPageProps {
    onLoading: (loading: boolean) => void;
}

interface ISignInPageState {
    loading: boolean;
    emailAddress: Value;
    password: Value;
}

export default class SignInPage extends React.Component<ISignInPageProps, ISignInPageState> {
    feedback: Feedback;
    email: Text;

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            emailAddress: new Value('email address', Rules.Required, Rules.EmailAddress),
            password: new Value('password', Rules.Required)
        };
    }

    componentDidMount() {
        this.email.focus();
    }

    render() {
        return <div>
            <div className='sign-in-background'></div>
            <div className='sign-in'>
                <InnerContainer>
                    <Row>
                        <Col xs={12}>
                            <h1>Sign In</h1>
                        </Col>
                    </Row>
                    <Row className='spacing-top'>
                        <Col xs={12}>
                            <Text
                                ref={c => this.email = c as Text}
                                label='Email Address'
                                value={this.state.emailAddress.get()}
                                error={this.state.emailAddress.error()}
                                onChange={value => this.setState({ emailAddress: this.state.emailAddress.set(value) })}
                            />
                        </Col>
                    </Row>
                    <Row className='spacing-top'>
                        <Col xs={12}>
                            <Password
                                label='Password'
                                value={this.state.password.get()}
                                error={this.state.password.error()}
                                onChange={value => this.setState({ password: this.state.password.set(value) })}
                            />
                        </Col>
                    </Row>
                    <Row className='spacing-top-large'>
                        <Col xs={4} xsOffset={8}>
                            <PrimaryButton
                                label='Sign In'
                                onClick={() => this.onSignIn()}
                                loading={this.state.loading}
                            />
                        </Col>
                    </Row>
                </InnerContainer>
            </div>

            <Feedback
                ref={c => this.feedback = c as Feedback}
            />
        </div>;
    }

    async onSignIn() {
        let errors = Object.keys(this.state)
            .filter(key => this.state[key].validate)
            .map(key => this.state[key].validate());
    
        this.forceUpdate();
        if (errors.some(e => e))
            return;

        try {
            this.setState({ loading: true });

            let user = await UserService.signIn(this.state.emailAddress.get(), this.state.password.get(), true);
            console.log(user);
            alert('success');
        } catch (e) {
            this.feedback.message(FeedbackType.Error, e.toString());
        } finally {
            this.setState({ loading: false });
        }
    }
}