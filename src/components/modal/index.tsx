import * as React from 'react';

import Portal from 'components/portal';
import Icon from 'components/icon';

import { KeyCodes } from 'utilities/constants';

import './style.scss';

interface IModalProps {
    visible: boolean;
    onClose: () => void;

    size?: ModalSize;
    title?: string;
    className?: string;
}

interface IModalState {
    
}

export enum ModalSize {
    Small = 'modal-small',
    Medium = 'modal-medium',
    Large = 'modal-large'
}

export class Modal extends React.Component<IModalProps, IModalState> {
    onKeyUpHandler: any;

    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    componentDidMount() {
        this.onKeyUpHandler = this.onKeyUp.bind(this);
        window.addEventListener('keyup', this.onKeyUpHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.onKeyUpHandler);
    }

    render() {
        return <Portal>
            <div className={`modal ${this.props.visible ? 'modal-visible' : 'modal-hidden'} ${this.props.className || ''}`}>
                <div className='modal-focus'></div>
                <div className={`modal-content ${this.props.size || ModalSize.Medium}`}>
                    <div className='modal-close'>
                        <Icon tooltip='Close' onClick={this.props.onClose.bind(this)}>close</Icon>
                    </div>
                    {this.props.title && <span className='modal-title'>{this.props.title}</span>}
                    {this.props.children}
                </div>
            </div>
        </Portal>
    }

    onKeyUp(e) {
        if (e.keyCode === KeyCodes.Escape)
            this.props.onClose();
    }
}