import * as React from 'react';

import { Container, Row, Col } from 'components/grid';
import { Text } from 'components/form';

import Password from 'models/password';

import PasswordService from 'data/passwords';

import './style.scss';

interface IListPageState {
    passwords: Password[],
    loading: boolean;
    search: string;
}

export default class ListPage extends React.Component<any, IListPageState> {
    constructor(props) {
        super(props);

        this.state = {
            passwords: [],
            loading: false,
            search: ''
        };
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true });
            let passwords = await PasswordService.get();
            this.setState({ passwords });
        } catch (e) {
            alert(e);
        } finally {
            this.setState({ loading: false });
        }
    }

    render() {
        return <Container>
            <Row className='spacing-top-large'>
                <Col xs={6} className='search-wrapper'>
                    <Text
                        inputClassName='search'
                        value={this.state.search}
                        onChange={this.onSearchChange.bind(this)}
                        placeholder='Search by domain or username...'
                    />
                    <i className="material-icons">{this.state.search ? 'close' : 'search'}</i>
                </Col>
            </Row>
            <Row className='spacing-top-large'>
                <Col xs={12}>
                    <table>
                        <thead>
                            <tr>
                                <th>Domain</th>
                                <th>Username</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.passwords.map((p, i) => <tr key={i}>
                                <td>{p.domain}</td>
                                <td>{p.username}</td>
                                <td></td>
                            </tr>)}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>;
    }

    onSearchChange(search) {
        this.setState({ search });
    }
}