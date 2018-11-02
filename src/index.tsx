import '@babel/polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Header from 'components/header';

import User from 'models/user';

import UserService from 'data/user';

import ListPage from 'pages/list';
import ToolsPage from 'pages/tools';

import './style.scss';

interface IApplicationState {
    user: User | null;
    loading: boolean;
}

class Application extends React.Component<any, IApplicationState> {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            loading: false
        };
    }

    async componentDidMount() {
        try {
            let user = await UserService.get('a token');
            this.setState({ user });
        } catch (e) {
            alert(e);
        } finally {
        }         
    }

    render() {
        return <Router>
            <div>
                <Header user={this.state.user} loading={this.state.loading} />

                <Route
                    path='/'
                    render={(props) => <ListPage {...props} onLoading={this.onLoading.bind(this)} />}
                />

                <Route path='/tools' component={ToolsPage} />
            </div>
        </Router>;
    }

    onLoading(loading: boolean) {
        console.log(loading);
        this.setState({ loading });
    }
}

ReactDOM.render(<Application />, document.querySelector('main'));