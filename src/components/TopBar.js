import React from 'react';
import { Link } from 'react-router-dom';
import './Routes.scss';

import navbarBrandImage from '../images/icon.svg';
import gitHubImage from '../images/github.svg';
import './TopBar.scss';
import { Navbar} from 'react-bootstrap';


function TopBar(props) {
    return (
        <Navbar collapseOnSelect="true" className="col-12 sticky-top" expand="lg" id="top-navbar">
            <Navbar.Brand className="navbar-brand col-1 col-sm-2 col-md-2 col-lg-3 m-0 p-0 px-1">
                <Link className="col-12 col-sm-4 m-0 p-0 px-0 px-sm-2 pr-sm-3" to="/">
                    <img src={navbarBrandImage} alt="Settle" />
                    <span class="title">Django RESTQL Play Ground</span>
                </Link>
            </Navbar.Brand>

            <a href="https://github.com/yezyilomo/django-restql" className="github-link m-0 py-0 px-2">
                <img src={gitHubImage} alt="Settle" />
            </a>
        </Navbar>
    );
}

export {TopBar}
