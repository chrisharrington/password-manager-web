import * as React from 'react';

import { Container, Row, Col } from 'components/grid';
import { Text, PrimaryButton } from 'components/form';
import InfiniteScroll from 'components/infinite-scroll';
import { Feedback, FeedbackType } from 'components/feedback';

import Password from 'models/password';

import PasswordService from 'data/password';

import PasswordListItem from './password-list-item';
import PasswordModal from './password-modal';
import Delete from './delete';
import Search from './search';

import './style.scss';

const PAGE_SIZE: number = 60;

interface IListPageProps {
    onLoading: (loading: boolean) => void;
}

interface IListPageState {
    passwords: Password[],
    search: string;
    page: number;
    delete: Password | null;
}

export default class ListPage extends React.Component<IListPageProps, IListPageState> {
    infiniteScroll: InfiniteScroll;
    feedback: Feedback;
    modal: PasswordModal;
    delete: Delete;

    constructor(props) {
        super(props);

        this.state = {
            passwords: [],
            search: '',
            page: 1,
            delete: null
        };
    }

    render() {
        return <Container className='list-page'>
            <Row className='spacing-top-large'>
                <Col xs={6} className='search-wrapper'>
                    <Search
                        onSearch={this.onSearch.bind(this)}
                    />
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
            this.props.onLoading(true);
            let passwords = await PasswordService.get(this.state.search, start, count);
            this.setState({ passwords });
            return passwords;
        } catch (e) {
            this.feedback.message(FeedbackType.Error, e.toString());
        } finally {
            console.log('loading done');
            this.props.onLoading(false);
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
    
    async onSearch(search: string) {
        this.setState({
            search
        });

        await this.infiniteScroll.update();
    }
}