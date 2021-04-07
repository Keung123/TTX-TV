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

import './App.css';

function App() {
  return (
    <React.Fragment>
      <NAVBAR />
       
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />

          {/* DEV ONLY */}
          <Route path='/testing' component={Testing} />
          <Route path='/upload' component={Upload} />
          {/* <Route path='/search' component={Search} />
          <Route path='/details' component={Details} />
          <Route component={NoMatch} /> */}
        </Switch>
      
      </Router>
      <FOOTER />
    </React.Fragment>
  );
}

export default App;
