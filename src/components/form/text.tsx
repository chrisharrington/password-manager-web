import * as React from 'react';

import { Tooltip } from 'components/tooltip';
import Icon from 'components/icon';

import { KeyCodes } from 'utilities/constants';

import './style.scss';

interface ITextProps {
    value: string;
    onChange: (value: string) => void;

    placeholder?: string;
    className?: string;
    inputClassName?: string;
    label?: string;
    error?: string;

    onKeyUp?: (keyCode: number) => void;
}

interface ITextState {
    focused: boolean;
}

export default class Text extends React.Component<ITextProps, ITextState> {
    input: HTMLInputElement;

    constructor(props) {
        super(props);

        this.state = {
            focused: false
        };
    }
    
    render() {
        return <div className={`form text ${this.props.className || ''} ${this.state.focused ? 'focused' : ''} ${this.props.error ? 'has-error' : ''}`}>
            {this.props.label && <label>{this.props.label}</label>}
            <input
                ref={c => this.input = c as HTMLInputElement}
                value={this.props.value}
                onFocus={() => this.setState({ focused: true })}
                onBlur={() => this.setState({ focused: false })}
                className={this.props.inputClassName || ''}
                type='text'
                placeholder={this.props.placeholder}
                onChange={e => this.props.onChange(e.target.value)}
                onKeyUp={e => this.props.onKeyUp && this.onKeyUp(e.keyCode)}
            />
            <div className='focus'></div>
            
            <div className='form-error-icon-wrapper'>
                <Tooltip
                    message={this.props.error || ''}
                >
                    <Icon
                        className='form-error-icon'
                        name='error'
                    />
                </Tooltip>
            </div>
        </div>;
    }

    focus() {
        this.input.focus();
    }

    onKeyUp(e) {
        
    }
}