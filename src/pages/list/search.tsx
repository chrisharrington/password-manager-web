import * as React from 'react';

import { Text } from 'components/form';

import { KeyCodes } from 'utilities/constants';

interface ISearchProps {
    onSearch: (search: string) => void;
}

interface ISearchState {
    search: string;
}

export default class Search extends React.Component<ISearchProps, ISearchState> {
    onKeyDownHandler: () => void;
    search: Text;
    searchTimeout: any;

    constructor(props) {
        super(props);

        this.state = {
            search: ''
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
        return <div>
            <Text
                ref={c => this.search = c as Text}
                inputClassName='search'
                value={this.state.search}
                onChange={this.onChange.bind(this)}
                placeholder='Search by domain or username...'
            />
            <i className='material-icons' onClick={() => this.onChange('')}>{this.state.search ? 'close' : 'search'}</i>
        </div>;
    }

    onChange(search) {
        if (this.searchTimeout)
            clearTimeout(this.searchTimeout);

        this.setState({
            search
        }, () => {
            this.searchTimeout = setTimeout(async () => {
                this.props.onSearch(search);
            }, 350);
        });
    }

    onKeyDown(e) {
        if (e.keyCode === KeyCodes.F3 || (e.keyCode === KeyCodes.F && e.ctrlKey)) {
            this.search.focus();
            e.preventDefault();
        }
    }
}