import * as React from 'react';

import { Container, Row, Col } from 'components/grid';
import { Text, Button } from 'components/form';
import InfiniteScroll from 'components/infinite-scroll';
import { Feedback, FeedbackType } from 'components/feedback';

import Password from 'models/password';

import PasswordService from 'data/passwords';

import { KeyCodes } from 'utilities/constants';

import PasswordListItem from './password-list-item';
import PasswordModal from './password-modal';

import './style.scss';

const PAGE_SIZE: number = 60;

interface IListPageState {
    passwords: Password[],
    loading: boolean;
    search: string;
    page: number;
    activePassword: Password | null;
}

export default class ListPage extends React.Component<any, IListPageState> {
    onKeyDownHandler: () => void;
    search: Text;
    infiniteScroll: InfiniteScroll;
    feedback: Feedback;

    constructor(props) {
        super(props);

        this.state = {
            passwords: [],
            loading: false,
            search: '',
            page: 1,
            activePassword: null
        };
    }

    async componentDidMount() {
        this.onKeyDownHandler = this.onKeyDown.bind(this);
        window.addEventListener('keydown', this.onKeyDownHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.onKeyDownHandler);
    }

    render() {
        return <Container className='list-page'>
            <Row className='spacing-top-large'>
                <Col xs={6} className='search-wrapper'>
                    <Text
                        ref={c => this.search = c as Text}
                        inputClassName='search'
                        value={this.state.search}
                        onChange={this.onSearchChange.bind(this)}
                        placeholder='Search by domain or username...'
                    />
                    <i className='material-icons' onClick={() => this.setState({ search: '' })}>{this.state.search ? 'close' : 'search'}</i>
                </Col>
                <Col xs={2} xsOffset={4}>
                    <Button
                        label='Add Password...'
                        onClick={() => alert('add password')}
                    />
                </Col>
            </Row>
            <Row className='spacing-top-large'>
                <InfiniteScroll
                    ref={c => this.infiniteScroll = c as InfiniteScroll}
                    count={PAGE_SIZE}
                    get={this.get.bind(this)}
                    build={this.build.bind(this)}
                />    
            </Row>

            <PasswordModal 
                password={this.state.activePassword}
                onClose={() => this.setState({ activePassword: null })}
            />

            <Feedback ref={c => this.feedback = c as Feedback} />
        </Container>;
    }

    async get(start: number, count: number) {
        try {
            this.setState({ loading: true });
            let passwords = await PasswordService.get(this.state.search, start, count);
            this.setState({ passwords });
            return passwords;
        } catch (e) {
            alert(e);
        } finally {
            this.setState({ loading: false });
        }
    }

    build(password: Password, index: number) : JSX.Element {
        return <Col xs={4} className='spacing-bottom' key={index}>
            <PasswordListItem
                password={password}
                onClick={this.onSelectPassword.bind(this)}
                onFeedback={(type: FeedbackType, message: string) => this.feedback.message(type, message)}
            />
        </Col>;
    }

    onSearchChange(search) {
        this.setState({ search }, async () => {
            await this.infiniteScroll.update();
        });
    }

    onKeyDown(e) {
        if (e.keyCode === KeyCodes.F3 || (e.keyCode === KeyCodes.F && e.ctrlKey)) {
            this.search.focus();
            e.preventDefault();
        }
    }

    onSelectPassword(password) {
        this.setState({
            activePassword: password
        });
    }
}