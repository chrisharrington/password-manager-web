import * as React from 'react';

import { FeedbackType } from 'components/feedback';
import Confirm from 'components/confirm';

import Password from 'models/password';

import PasswordService from 'data/password';

interface IDeleteProps {
    onDeleted: () => void;
    onFeedback: (type: FeedbackType, message: string) => void;
}

interface IDeleteState {
    loading: boolean;
    password: Password | null;
}

export default class Delete extends React.Component<IDeleteProps, IDeleteState> {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            password: null
        }
    }

    render() {
        return <Confirm
            visible={!!this.state.password}
            title={'Are you sure?'}
            message={this.state.password ? `This process is irreversible. Once deleted, this password for ${this.state.password.domain} will be gone forever.` : ''}
            onOk={() => this.onDelete(this.state.password)}
            onCancel={() => this.setState({ password: null })}
        />;
    }

    load(password: Password) {
        this.setState({
            password
        });
    }

    async onDelete(password: Password | null) {
        if (!password)
            return;

        try {
            this.setState({ loading: true });
            await PasswordService.delete(password);
            this.setState({ password: null });
            this.props.onDeleted();
        } catch (e) {
            this.props.onFeedback(FeedbackType.Error, e.toString());
        } finally {
            this.setState({ loading: false });
        }
    }
}