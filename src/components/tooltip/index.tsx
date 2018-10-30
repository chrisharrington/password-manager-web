import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Portal from 'components/portal';

import './style.scss';

export enum TooltipPlacement {
    Bottom = 'bottom',
    BottomLeft = 'bottom-left',
    BottomRight = 'bottom-right'
}

export enum TooltipEvent {
    Focus = 'onFocus',
    Blur = 'onBlur',
    MouseEnter = 'onMouseEnter',
    MouseLeave = 'onMouseLeave'
}

export enum TooltipSize {
    Fill = 'fill',
    Small = 'small',
    Large = 'large'
}

export interface ITooltipProps {
    title?: string;
    message: string;
    className?: string;
    placement?: TooltipPlacement;
    yOffset?: number;
    delayShow?: number;
    delayHide?: number;
    disabled?: boolean;
    onEvent?: TooltipEvent;
    offEvent?: TooltipEvent;
    size?: TooltipSize;
}

interface ITooltipState {
    visible: boolean;
    width: number;
    top: number;
    left: number;
}

export class Tooltip extends React.Component<ITooltipProps, ITooltipState> {
    children: HTMLDivElement;

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            width: 0,
            top: 0,
            left: 0
        };
    }

    render() {
        const placement: TooltipPlacement = this.props.placement || TooltipPlacement.Bottom;
        return <div className='tooltip'>
            <div className='tooltip-children' {...this.buildEventProps()} ref={c => this.children = c as HTMLDivElement}>
                {this.props.children}
            </div>
            <Portal>
                <div className={`tooltip-content-wrapper ${placement} ${this.state.visible ? 'tooltip-content-wrapper-visible' : ''}`} style={{ left: `${this.state.left}px`, top: `${this.state.top}px`}}>
                    <div className='tooltip-arrow-wrapper' style={{ width: `${this.state.width}px` }}>
                        <div className='tooltip-arrow'></div>
                    </div>
                    <div className={`tooltip-content ${this.props.size || TooltipSize.Fill} ${this.props.className || ''}`}>
                        <span className={`tooltip-title ${this.props.title ? 'tooltip-title-visible' : ''}`}>{this.props.title}</span>
                        <span className='tooltip-message'>{this.props.message}</span>
                    </div>
                </div>
            </Portal>
        </div>;
    }

    buildEventProps() {
        let props = {},
            onEvent: TooltipEvent = this.props.onEvent || TooltipEvent.MouseEnter,
            offEvent: TooltipEvent = this.props.offEvent || TooltipEvent.MouseLeave;

        props[onEvent] = this.show.bind(this, true);
        props[offEvent] = this.show.bind(this, false);
        return props;
    }

    show(visible: boolean) {
        let dom = ReactDOM.findDOMNode(this.children) as any;
        if (!dom)
            return;

        let rect = dom.getBoundingClientRect();
        console.log(rect);
        this.setState({
            width: rect.width,
            top: rect.y + rect.height + (window as any).pageYOffset + (this.props.yOffset || 0),
            left: rect.x + (window as any).pageXOffset,
            visible: this.props.disabled ? false : visible
        });
    }
}