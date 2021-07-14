import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const NavBar = () => {
    //redirect
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/')
    }
    return (
        <nav>
            <div className="nav-wrapper">
                <a href="#" className='brand-logo'>Logo</a>
                <ul id="nav-mobile" className='right hide-on-med-and-down'>
                    <li><a href="https://github.com/EvgenPrushk" target="_blank"> Мой Linkedin</a></li>
                    <li><a href="https://github.com/EvgenPrushk" target="_blank"> Мой Linkedin</a></li>
                    <li><a href="https://github.com/EvgenPrushk" target="_blank"> Мой Linkedin</a></li>
                    <li><a href="https://www.linkedin.com/in/evgen-prushak-631025a0/" target="_blank"> My Linkedin</a></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}
