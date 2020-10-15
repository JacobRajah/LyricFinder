import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './components/about/about';
import Home from './components/home/home';
import TopCharts from './components/topcharts/TopCharts';
import Trending from './components/trending/trending'

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/topcharts' component={TopCharts}/>
          <Route path='/trending' component={Trending}/>
          <Route path='/about' component={About}/>
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