import * as React from 'react';

interface IIconButtonProps {
    icon: string;
    label: string;
    onClick: () => void;
    className?: string;
}

export default class IconButton extends React.Component<IIconButtonProps, any> {
    render() {
        return <button className={`icon-button ${this.props.className || ''}`} onClick={this.props.onClick.bind(this)}>
            <i className='material-icons'>{this.props.icon}</i>
            <span>{this.props.label}</span>
        </button>;
    }
}