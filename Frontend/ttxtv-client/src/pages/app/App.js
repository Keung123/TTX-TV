/** 
 * @file The root component of react app
 */

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NAVBAR from '../../components/navbar';
import FOOTER from '../../components/footer';

import Home from '../home/Home';

// DEV ONLY
import Testing from '../testing/Testing';
import Upload from '../upload/Upload';
import Player from '../player/Player';
import Account from '../account/Account';
import Login from '../login/Login';

import './App.css';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			hasToken : false,
			showLogin : false,
			stateLoginRegister : false,
			showHome : false
		};
	}

	componentDidUpdate() {
        console.log('app update');
    }

	render() {
		return (
			<React.Fragment>

				<NAVBAR />
	
				<Router>
					<Switch>
						<Route exact path='/:has' component={Home}/>

						<Route path='/testing' component={Testing} />

						<Route path='/login' component={Login}  props/>
						<Route path='/register' component={Player} />
						<Route path='/account' component={Account} />
	
						{/* DEV ONLY */}
						<Route path='/testing' component={Testing} />
						<Route path='/upload' component={Upload} />
						<Route path='/player' component={Player} />

						
					</Switch>
				</Router>

				<FOOTER />
			</React.Fragment>
		);
	}
}

export default App;
