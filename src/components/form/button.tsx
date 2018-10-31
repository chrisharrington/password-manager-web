import * as React from 'react';

interface IButtonProps {
    label: string;
    onClick: () => void;
    className?: string;
}

export default class Button extends React.Component<IButtonProps, any> {
    render() {
        return <button className={`button ${this.props.className || ''}`} onClick={() => this.props.onClick()}>
            {this.props.label}
        </button>;
    }
}