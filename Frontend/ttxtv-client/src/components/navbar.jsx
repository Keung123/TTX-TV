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

// import utils
import { theLoginUser, loginNewCookie, logoutRemoveCookie } from '../utils/cookies';

import logo from '../res/assets/Logo.svg';

class NAVBAR extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            url: '',
            succeed: 2, //0 false, 1 true, 2 null
            isLogin: false,
        };

        this.checkLogin = this.checkLogin.bind(this);
    }   

    checkLogin() {
        if(theLoginUser() !== undefined) {
            this.setState({
                isLogin: true
            });
        }
        else {
            this.setState({
                isLogin: false
            });
        }
    }

    componentDidMount() {
        this.checkLogin();
    }

    // componentDidUpdate() {
    //     this.checkLogin();
    // }

    componentWillReceiveProps(nextProps){
        this.setState({
            isLogin: nextProps.isLogin
        })
    }

    render() {
        return (
            <Navbar
                fixed='top'
                collapseOnSelect
                expand='lg'
                className='navbar'
                bg='dark'
                variant='dark'>

                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src={logo}
                        width="35"
                        height="35"
                        className="d-inline-block"
                    />
                    {' '}Tiaotiaoxiong TV
            </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {this.state.isLogin ? (
                        <Nav className="mr-auto">
                            <Nav.Link href="/rooms">Rooms</Nav.Link>
                            <Nav.Link href="/manage">Manage</Nav.Link>

                            {/* DEV ONLY */}
                            <Nav.Link href="/testing">DEV ONLY</Nav.Link>
                        </Nav>
                    ) : (
                        <Nav className="mr-auto">
                            {/* https://cn.piliapp.com/cool-text/strikethrough-text/ */}

                            <Nav.Link > ̶R̶o̶o̶m̶s̶</Nav.Link>
                            <Nav.Link > ̶M̶a̶n̶a̶g̶e̶</Nav.Link>
                            
                            {/* DEV ONLY */}
                            <Nav.Link > ̶D̶E̶V̶ ̶O̶N̶L̶Y̶</Nav.Link>
                        </Nav>
                    )}
                    
                    <Form inline>
                        {this.state.isLogin ? (
                            <Button href="/account" variant="info">My Account</Button>
                        ) : (
                            <Button href="/login" variant="warning">Login</Button>
                        )}
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}


export default NAVBAR;
