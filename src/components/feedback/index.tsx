import * as React from 'react';

import { Container, Row, Col } from 'components/grid';

import './style.scss';

const TIMEOUT: number = 5000;

interface IFeedbackState {
    type: FeedbackType | null;
    message: string | null;
    visible: boolean;
}

export enum FeedbackType {
    Info = 'info',
    Warning = 'warning',
    Error = 'error',
    Success = 'success'
}

export class Feedback extends React.Component<any, IFeedbackState> {
    timeout: any;

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            type: null,
            message: null
        };
    }

    render() {
        return <div className={`feedback ${this.state.visible ? 'feedback-shown' : ''} ${this.state.type}`}>
            <Container>
                <Row>
                    <Col xs={12} className='feedback-message'>
                        {this.state.message}
                    </Col>
                </Row>
            </Container>
        </div>;
    }

    message(type: FeedbackType, message: string) {
        if (this.timeout)
            clearTimeout(this.timeout);

        if (this.state.visible) {
            this.setState({
                visible: false
            });
            setTimeout(() => show.call(this), 350);
        } else {
            show.call(this);
        }

        function show() {
            this.setState({
                type,
                message,
                visible: true
            }, () => {
                this.timeout = setTimeout(() => {
                    this.setState({
                        visible: false
                    });
                }, TIMEOUT);
            });
        }
    }
}