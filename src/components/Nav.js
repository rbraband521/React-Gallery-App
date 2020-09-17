//stateless: for the apps navigation links
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
    render () {
        return (
            <nav className="main-nav">
                <ul>
                    <li><NavLink to='/sky'>Night Sky</NavLink></li>
                    <li><NavLink to='/flowers'>Flowers</NavLink></li>
                    <li><NavLink to='/rainbows'>Rainbows</NavLink></li>
                </ul>
            </nav>
        );
    }
}

export default Nav;
