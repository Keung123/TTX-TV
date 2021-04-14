/** 
 * @file Login Page of the app.
 */

import React from 'react';
import {
    Container,
    Button
} from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import { theLoginUser, loginNewCookie, logoutRemoveCookie } from '../../utils/cookies';

// import './Testing.css';

// import bgimg from '../../res/assets/blueprint.jpg';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            url: '',
            succeed: 2, //0 false, 1 true, 2 null
        };

        this.onClickLoginBTN = this.onClickLoginBTN.bind(this)
        this.onClickLogoutBTN = this.onClickLogoutBTN.bind(this)
    }

    onClickPrintBTN(e) {
        e.preventDefault();
        console.log(theLoginUser());
    }

    onClickLoginBTN(e) {
        e.preventDefault();

        let newUser = {
            name: 'niu!'
        };
        loginNewCookie(newUser);

        let path = {
            pathname:'/',
            state:{ hasLogin: true },
        }
        this.props.history.push(path);
    }

    onClickLogoutBTN(e) {
        e.preventDefault();
        logoutRemoveCookie();

        let path = {
            pathname:'/',
            state:{ hasLogin: false },
        }
        this.props.history.push(path);
    }


    render() {
        return(
            <React.Fragment>
                {/* <div className="bgdiv">
                    <img
                        alt=""
                        src={bgimg}
                        className="bgimg"
                    />
                </div> */}

                <Container fluid className="TestingConTainer">
                    <h1>L</h1>
                    <Button onClick={this.onClickLoginBTN}>Fake Login</Button>
                    <h1>o</h1>
                    <Button onClick={this.onClickLogoutBTN}>Fake Logout</Button>
                    <h1>g</h1>
                    <Button onClick={this.onClickPrintBTN}>Print Cookies</Button>
                    <h1>in</h1>
                </Container>

            </React.Fragment>
        );
    }
}

export default withRouter(Login);
