import * as React from 'react';

import './style.scss';

interface IIconProps {
    name: string;
    className?: string;
    onClick?: () => void;
}

export default class Icon extends React.Component<IIconProps, any> {
    render() {
        return <i
            className={`${this.props.className || ''} material-icons`}
            onClick={() => this.props.onClick && this.props.onClick()}
        >
            {this.props.name}
        </i>;
    }
}