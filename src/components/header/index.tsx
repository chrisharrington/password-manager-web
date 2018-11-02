import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Gravatar from 'react-gravatar';
import { Link } from 'react-router-dom';
import * as Nanobar from 'nanobar';

import { Container, Row, Col } from 'components/grid';

import User from 'models/user';

import './style.scss';
import { NavDropdownBaseProps } from 'react-bootstrap/lib/NavDropdown';

interface IHeaderProps {
    user: User | null,
    loading: boolean;
}

export default class Header extends React.Component<IHeaderProps, {}> {
    loader: HTMLDivElement;
    progress: Nanobar;

    componentDidMount() {
        this.progress = new Nanobar({
            target: this.loader,
            classname: 'progress'
        });
    }

    componentDidUpdate(props) {
        console.log(props);
        console.log(this.props);
        if (props.loading === false && this.props.loading) {
            this.progress.go(80);
        } else if (props.loading && this.props.loading === false) {
            console.log('done');
            this.progress.go(100);
            // setTimeout(() => {
            //     this.progress.go(0);
            // }, 350);
        }
    }

    render() {
        return <header>
            <Container>
                <Row>
                    <Col xs={12}>
                        <div className='actions'>
                            <Link to='/list'>List</Link>
                            <Link to='/tools'>Tools</Link>
                            <Link to='/settings'>Settings</Link>
                        </div>

                        {this.props.user && <div className='profile'>
                            <Gravatar email={this.props.user.email} />
                            <div>
                                <span className='name'>{this.props.user.name()}</span>
                                <br />
                                <span className='email'>{this.props.user.email}</span>
                                <div className='clearfix'></div>
                            </div>
                        </div>}
                    </Col>
                </Row>
            </Container>
            <div id='loader' ref={c => this.loader = c as HTMLDivElement}></div>
        </header>;
    }
}