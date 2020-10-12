import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home';
import TopCharts from './components/TopCharts';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/topcharts' component={TopCharts}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;