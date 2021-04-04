/** 
 * @file The root component of react app
 */

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NAVBAR from '../../components/navbar';
import FOOTER from '../../components/footer';
// import Home from './views/Home';

import './App.css';

function App() {
  return (
    <React.Fragment>
      <NAVBAR />
      <p> Test </p>
      <Router>
        <Switch>
          {/* <Route exact path='/' component={Home} />
          <Route path='/search' component={Search} />
          <Route path='/details' component={Details} />
          <Route component={NoMatch} /> */}
        </Switch>
      </Router>
      <FOOTER />
    </React.Fragment>
  );
}

export default App;