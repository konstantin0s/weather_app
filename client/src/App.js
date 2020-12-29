import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import City from './components/City';
import './App.css';


class App extends Component {


  render() {

    return (
<Router>
<div className="App">
      <Header />
   <Switch>
   <Route exact path="/" component={Home} />
    <Route exact
        path="/city/:id"
        render={request => {
          const id = request.match.params.id
          console.log(id);
          return <City id={id} />;
        }}
      /> 

{/* <Route exact path="/trendings" component={Trendings} /> */}
     </Switch>
    <Footer />
            </div>
</Router>
    );
  }
}

export default App;