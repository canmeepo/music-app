import React, { Component } from 'react';
import Header from './Header.js';
import Artists from './Artists.js';

import '../assets/styles/App.css';

class Home extends Component {
    render() {
        return (
            <div className="App">
                <Header></Header>
                <Artists></Artists>
            </div>
        );
    }
}

export default Home;
