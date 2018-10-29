import * as React from 'react';

import Password from 'models/password';

interface IPasswordListItemProps {
    password: Password;
    onClick: (password: Password) => void;
}

export default class PasswordListItem extends React.Component<IPasswordListItemProps, any> {
    render() {
        const password = this.props.password;
        return <div className='password-list-item' onClick={() => this.props.onClick(password)}>
            <span className='domain'>{password.domain}</span>
            <span className='username'>{password.username}</span>
            
            <div className='actions'>
                <i className='material-icons delete'>delete</i>
                <i className='material-icons favourite'>star_border</i>
                <button>
                    <i className='material-icons'>edit</i>
                    
                </button>
                </div>
                <div className='button-wrapper'>
                    <i className='material-icons'>vpn_key</i>
                </div>
                <div className='button-wrapper'>
                    <i className='material-icons'>person</i>
                </div>
                <div className='clearfix'></div>
            </div>
        </div>
    }
}