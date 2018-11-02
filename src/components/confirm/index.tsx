import * as React from 'react';

import { InnerContainer, Row, Col } from 'components/grid';
import { Modal } from 'components/modal';
import { PrimaryButton, SecondaryButton } from 'components/form';

interface IConfirmProps {
    visible: boolean;
    title: string;
    message: string;

    onOk: () => void;
    onCancel: () => void;
}

export default class Confirm extends React.Component<IConfirmProps, any> {
    render() {
        return <Modal
            title={this.props.title}
            visible={this.props.visible}
            onClose={this.props.onCancel.bind(this)}
        >
            <InnerContainer>
                <Row>
                    <Col xs={12}>
                        {this.props.message}
                    </Col>
                </Row>
                <Row className='spacing-top-large'>
                    <Col xs={2} xsOffset={8}>
                        <SecondaryButton
                            onClick={this.props.onCancel.bind(this)}
                            label={'Cancel'}
                        />
                    </Col>
                    <Col xs={2}>
                        <PrimaryButton
                            onClick={this.props.onOk.bind(this)}
                            label={'OK'}
                        />
                    </Col>
                </Row>
            </InnerContainer>
        </Modal>
    }
}