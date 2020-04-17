import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Boards from './Components/Boards';
import Board from './Components/Board';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/boards" component={Boards} />
          <Route exact path="/boards/:boardId" component={Board} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
