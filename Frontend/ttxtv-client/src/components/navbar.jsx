/** 
 * @file React component, navbar displayed at top of the page.
 */

import React from 'react';
import {
    Navbar,
    Button,
    Form,
    Nav
} from 'react-bootstrap';

import logo from '../res/assets/Logo.svg';

const NAVBAR = () => {
    return (
        <Navbar
            fixed='top'
            collapseOnSelect
            expand='lg'
            className='navbar'
            bg='dark'
            variant='dark'>

            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src={logo}
                    width="35"
                    height="35"
                    className="d-inline-block"
                />
                {' '}Tiaotiaoxiong TV
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#rooms">Rooms</Nav.Link>
                    <Nav.Link href="#manage">Manage</Nav.Link>
                    
                </Nav>
                <Form inline>
                    <Button variant="info">My Account</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};




export default NAVBAR;
