import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Artist from './Artist.js';
import Home from './Home.js';

import '../assets/styles/App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/artist/:name" component={Artist}></Route>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
