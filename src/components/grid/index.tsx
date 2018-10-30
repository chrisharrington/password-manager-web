import * as React from 'react';

export class Container extends React.Component<any, any> {
    render() {
        return <div className={`container ${this.props.className || ''}`}>
            {this.props.children}
        </div>;
    }
}

export class InnerContainer extends React.Component<any, any> {
    render() {
        return <div className={`inner-container ${this.props.className || ''}`}>
            {this.props.children}
        </div>;
    }
}

export class Row extends React.Component<any, any> {
    render() {
        return <div className={`row ${this.props.className || ''}`}>
            {this.props.children}
        </div>;
    }
}

export class Col extends React.Component<any, any> {
    render() {
        let className = `${this.props.className || ''} col-`;
        if (this.props.xs)
            className += 'xs-' + this.props.xs;
        else if (this.props.sm)
            className += 'sm-' + this.props.sm;
        else if (this.props.md)
            className += 'md-' + this.props.md;
        else if (this.props.lg)
            className += 'lg-' + this.props.lg;
            
        return <div className={className}>
            {this.props.children}
        </div>;
    }
}