import React from "react";
import { NavLink, Link } from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <header>
                <NavLink to="/"><img src="images/Logo-Language.png" alt="Лого сайту" /></NavLink>
                <h1>Easy Лангуаге</h1>
                <input type="checkbox" id="menu-toggle" />
                <label for="menu-toggle" class="menu-icon">☰</label>
                <nav>
                    <ul class="nav-menu">
                        <li><NavLink to="/lessons">Уроки</NavLink></li>
                        <li><NavLink to="/progress">Мій прогрес</NavLink></li>
                        <li><NavLink to="/practice">Практика</NavLink></li>
                    </ul>
                </nav> 
            </header>
        );
    }
}

export default Header;