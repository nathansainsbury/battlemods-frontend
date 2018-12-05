import React, { Component } from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import Home from './../Home';
import InsertFunction from './../InsertFunction';

export default class App extends Component<any, any> {

  render() {
    
    return (
      <Router>
        <div>
          <Route path='/' component={Home} exact={true} />
          <Route path='/insert' component={InsertFunction} exact={true} />
        </div>
      </Router>
    );
  }
}