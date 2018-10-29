import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default class Portal extends React.Component<{}, {}> {
    render() {
        return ReactDOM.createPortal(<div className='portal-cp'>
            {this.props.children}
        </div>, document.body);
    }
}