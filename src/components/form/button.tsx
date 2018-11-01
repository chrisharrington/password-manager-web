import * as React from 'react';

interface IButtonProps {
    label: string;
    onClick: () => void;
    className?: string;
}

class Button extends React.Component<IButtonProps, any> {
    render() {
        return <button className={`button ${this.props.className || ''}`} onClick={() => this.props.onClick()}>
            {this.props.label}
        </button>;
    }
}

export class PrimaryButton extends React.Component<IButtonProps, any> {
    render() {
        return <Button {...this.props} className={`${this.props.className || ''} primary-button`} />;
    }
}

export class SecondaryButton extends React.Component<IButtonProps, any> {
    render() {
        return <Button {...this.props} className={`${this.props.className || ''} secondary-button`} />;
    }
}