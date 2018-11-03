import '@babel/polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Header from 'components/header';

import User from 'models/user';

import UserService from 'data/user';

import ListPage from 'pages/list';
import SignInPage from 'pages/sign-in';
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

    render() {
        return <Router>
            <div>
                <Header user={this.state.user} loading={this.state.loading} />

                <Route
                    path='/'
                    render={(props) => <SignInPage {...props} onLoading={this.onLoading.bind(this)} />}
                />

                <Route
                    path='/passwords'
                    render={(props) => <ListPage {...props} onLoading={this.onLoading.bind(this)} />}
                />

                <Route path='/tools' component={ToolsPage} />
            </div>
        </Router>;
    }

    onLoading(loading: boolean) {
        this.setState({ loading });
    }
}

ReactDOM.render(<Application />, document.querySelector('main'));