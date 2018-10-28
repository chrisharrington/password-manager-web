import * as React from 'react';

import './style.scss';

interface ITextProps {
    value: string;
    onChange: (value: string) => void;

    placeholder?: string;
    className?: string;
    inputClassName?: string;
    label?: string;
}

export default class Text extends React.Component<ITextProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            focused: false
        };
    }
    
    render() {
        return <div className={`form text ${this.props.className || ''} ${this.state.focused ? 'focused' : ''}`}>
            {this.props.label && <label>{this.props.label}</label>}
            <input
                onFocus={() => this.setState({ focused: true })}
                onBlur={() => this.setState({ focused: false })}
                className={this.props.inputClassName || ''}
                type='text'
                placeholder={this.props.placeholder}
                onChange={e => this.props.onChange(e.target.value)}
            />
            <div className='focus'></div>
        </div>;
    }
}