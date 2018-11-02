import * as React from 'react';

interface IButtonProps {
    label: string;
    onClick: () => void;
    className?: string;
    loading?: boolean;
}

class Button extends React.Component<IButtonProps, any> {
    render() {
        return <button disabled={this.props.loading} className={`button ${this.props.className || ''} ${this.props.loading ? 'loading' : ''}`} onClick={() => this.props.onClick()}>
            <div className='label'>{this.props.label}</div>
            <div className='loader'>
                <div></div>
            </div>
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