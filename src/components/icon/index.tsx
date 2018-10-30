import * as React from 'react';

import { Tooltip } from 'components/tooltip';

import './style.scss';

interface IIconProps {
    tooltip: string;
    highlight?: boolean;
    className?: string;
    onClick?: () => void;
}

export default class Icon extends React.Component<IIconProps, any> {
    render() {
        return <Tooltip message={this.props.tooltip} yOffset={-10}>
            <div className={`icon-wrapper ${this.props.className || ''}`} onClick={() => this.props.onClick && this.props.onClick()}>
                <i className='material-icons icon'>
                    <div>
                        {this.props.children}
                    </div>
                    <div className='highlight'></div>
                </i>
            </div>
        </Tooltip>;
    }
}