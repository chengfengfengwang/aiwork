/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/13 下午10:57
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Navbar'
import NavDropdown from 'react-bootstrap/lib/Navbar'
import NavItem from 'react-bootstrap/lib/Navbar'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import * as actions from '../actions/index'

import './TopBar.css'

@connect(state => ({nickname: state.user.nickname}), {
    onLogout: () => actions.loggedOut()
})
export default class TopBar extends Component {
    static propTypes = {
        nickname: PropTypes.string.isRequired,
        onLogout: PropTypes.func.isRequired
    };

    render() {
        const {nickname, onLogout} = this.props;
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">IGuitar</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pull-right>
                        <NavItem ><Link to="/">{nickname}</Link></NavItem>
                        <NavItem ><Link to="/logout" onClick={(e) => {
                            e.preventDefault();
                            onLogout();
                        }}>退出</Link></NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
