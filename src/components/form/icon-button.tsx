import * as React from 'react';

import { Tooltip } from 'components/tooltip';

import './style.scss';

interface IIconButtonProps {
    tooltip: string;
    tooltipDisabled?: boolean;
    highlight?: boolean;
    className?: string;
    onClick?: () => void;
}

export default class IconButton extends React.Component<IIconButtonProps, any> {
    render() {
        const highlight = this.props.highlight === undefined ? true : this.props.highlight;
        return <Tooltip message={this.props.tooltip} yOffset={-10} disabled={!!this.props.tooltipDisabled}>
            <div className={`icon ${this.props.className || ''} ${highlight ? 'with-highlight' : ''}`} onClick={() => this.props.onClick && this.props.onClick()}>
                <i className='material-icons icon-content'>
                    <div>
                        {this.props.children}
                    </div>
                    <div className='highlight'></div>
                </i>
            </div>
        </Tooltip>;
    }
}