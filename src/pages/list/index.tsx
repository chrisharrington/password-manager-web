import * as React from 'react';

import { Container, Row, Col } from 'components/grid';
import { Text, PrimaryButton } from 'components/form';
import InfiniteScroll from 'components/infinite-scroll';
import { Feedback, FeedbackType } from 'components/feedback';

import Password from 'models/password';

import PasswordService from 'data/password';

import { KeyCodes } from 'utilities/constants';

import PasswordListItem from './password-list-item';
import PasswordModal from './password-modal';
import Delete from './delete';

import './style.scss';

const PAGE_SIZE: number = 60;

interface IListPageState {
    passwords: Password[],
    loading: boolean;
    search: string;
    page: number;
    delete: Password | null;
}

export default class ListPage extends React.Component<any, IListPageState> {
    onKeyDownHandler: () => void;
    search: Text;
    infiniteScroll: InfiniteScroll;
    feedback: Feedback;
    modal: PasswordModal;
    delete: Delete;

    constructor(props) {
        super(props);

        this.state = {
            passwords: [],
            loading: false,
            search: '',
            page: 1,
            delete: null
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
                    <PrimaryButton
                        label='Add Password...'
                        onClick={() => this.modal.add()}
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
                ref={c => this.modal = c as PasswordModal}
                onFeedback={(type: FeedbackType, message: string) => this.feedback.message(type, message)}
                onSave={() => this.infiniteScroll.refresh()}
            />

            <Feedback
                ref={c => this.feedback = c as Feedback}
            />

            <Delete
                ref={c => this.delete = c as Delete}
                onDeleted={() => this.infiniteScroll.refresh()}
                onFeedback={(type: FeedbackType, message: string) => this.feedback.message(type, message)}
            />
        </Container>;
    }

    async get(start: number, count: number) {
        try {
            this.setState({ loading: true });
            let passwords = await PasswordService.get(this.state.search, start, count);
            this.setState({ passwords });
            return passwords;
        } catch (e) {
            this.feedback.message(FeedbackType.Error, e.toString());
        } finally {
            this.setState({ loading: false });
        }
    }

    build(password: Password, index: number) : JSX.Element {
        return <Col xs={4} className='spacing-bottom' key={index}>
            <PasswordListItem
                password={password}
                onFeedback={(type: FeedbackType, message: string) => this.feedback.message(type, message)}
                onEdit={password => this.modal.edit(password)}
                onDelete={password => this.delete.load(password)}
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
}