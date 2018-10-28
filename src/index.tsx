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
            loading: true
        };
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true });

            let user = await UserService.get('a token');
            this.setState({ user });
        } catch (e) {
            alert(e);
        } finally {
            this.setState({ loading: false });
        }         
    }

    render() {
        return <Router>
            <div>
                <Header user={this.state.user} />

                <Route path='/' exact component={ListPage} />
                <Route path='/tools' component={ToolsPage} />
            </div>
        </Router>;
    }
}

ReactDOM.render(<Application />, document.querySelector('main'));