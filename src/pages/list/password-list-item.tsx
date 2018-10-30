import * as React from 'react';

import { IconButton } from 'components/form';

import Password from 'models/password';

interface IPasswordListItemProps {
    password: Password;
    onClick?: (password: Password) => void;
}

export default class PasswordListItem extends React.Component<IPasswordListItemProps, any> {
    render() {
        const password = this.props.password;
        return <div className='password-list-item' onClick={() => this.props.onClick && this.props.onClick(password)}>
            <span className='domain'>{password.domain}</span>
            <span className='username'>{password.username}</span>
        </div>
    }
}