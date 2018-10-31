import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { FeedbackType } from 'components/feedback';
import Icon from 'components/icon';

import Password from 'models/password';

interface IPasswordListItemProps {
    password: Password;
    onClick?: (password: Password) => void;
    onFeedback: (type: FeedbackType, message: string) => void;
}

interface IPasswordListItemState {
    tooltipsDisabled: boolean;
}

export default class PasswordListItem extends React.Component<IPasswordListItemProps, IPasswordListItemState> {
    constructor(props) {
        super(props);

        this.state = {
            tooltipsDisabled: false
        };
    }
    
    render() {
        const password = this.props.password;
        return <div
            onMouseEnter={this.onMouseEnter.bind(this)}
            onMouseLeave={this.onMouseLeave.bind(this)}
            className='password-list-item'
        >
            <span className='domain'>{password.domain}</span>
            <span className='username'>{password.username}</span>
            
            <div className='actions'>
                <CopyToClipboard text={password.username}>
                    <Icon
                        tooltip='Copy Username'
                        tooltipDisabled={this.state.tooltipsDisabled}
                        onClick={() => this.props.onFeedback(FeedbackType.Success, `The username for ${password.domain} has been copied to your clipboard.`)}
                    >
                        person
                    </Icon>
                </CopyToClipboard>
                <CopyToClipboard text={password.password}>
                    <Icon
                        tooltip='Copy Password'
                        tooltipDisabled={this.state.tooltipsDisabled}
                        onClick={() => this.props.onFeedback(FeedbackType.Success, `The password for ${password.domain} has been copied to your clipboard.`)}
                    >
                        vpn_key
                    </Icon>
                </CopyToClipboard>
                <Icon
                    tooltip='Edit'
                    tooltipDisabled={this.state.tooltipsDisabled}
                >
                    edit
                </Icon>
                <Icon
                    tooltip='Delete'
                    tooltipDisabled={this.state.tooltipsDisabled}
                >
                    delete
                </Icon>
            </div>
        </div>
    }

    onMouseEnter() {
        this.setState({
            tooltipsDisabled: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    tooltipsDisabled: false
                });
            }, 350);
        });
    }

    onMouseLeave() {
        this.setState({
            tooltipsDisabled: false
        });
    }
}