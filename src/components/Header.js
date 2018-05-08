import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Logo from '../assets/img/logo.png';
import Search from '../assets/img/search.svg';

import '../assets/styles/Header.css';

class Header extends Component {
    render() {
        return (
            <div>
                <header className="Header">
                    <div className="Header-logo">
                        <Link to="/"><img src={Logo} alt="" /></Link>
                    </div>

                    <div className="Header-search">
                        <div className="Header-search__wrap">
                            <i className="Header-search__icon"><img src={Search} alt="" /></i>
                            <input type="text" placeholder="SEARCH" />
                        </div>
                    </div>
                    <ul className="Header-nav">
                        <li> <Link to="/">LIVE</Link></li>
                        <li> <Link to="/">ARTISTS</Link></li>
                        <li> <Link to="/">RELEASES</Link></li>
                        <li> <Link to="/">TOURS</Link></li>
                        <li> <Link to="/">CONTACT</Link></li>
                    </ul>
                    <div className="Header-auth">
                        <div className="Header-auth__login">LOG IN</div>
                        <span>or</span>
                        <div className="Header-auth__registr">REGISTER</div>
                    </div>
                </header>
            </div>
        );
    }
}

export default Header;
