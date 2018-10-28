import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Gravatar from 'react-gravatar';
import { Link } from 'react-router-dom';

import { Container, Row, Col } from 'components/grid';

import User from 'models/user';

import './style.scss';

interface IHeaderProps {
    user: User | null
}

export default class Header extends React.Component<IHeaderProps, {}> {
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
        </header>;
    }
}