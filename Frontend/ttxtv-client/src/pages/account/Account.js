/** 
 * @file Testing Page of the app, FOR DEV ONLY.
 */

import React from 'react';
import {
    Button,
    Card,
} from 'react-bootstrap';
import { withRouter } from "react-router-dom";

import firebase from '../../services/Firebase';
import { theLoginUser, logoutRemoveCookie } from '../../utils/cookies';

import NAVBAR from '../../components/navbar';

import './Account.css';
import bgimg from '../../res/assets/teddybear.jpg';

class Account extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLogout: false,
            displayName: null,
            email: null,
            verified: null,
            uid: null,
        };

        this.onClickLogoutBTN = this.onClickLogoutBTN.bind(this)
    }

    componentDidMount() {

        let cUser = theLoginUser();

        this.setState({
            displayName: cUser.user.displayName,
            email: cUser.user.email,
            verified: cUser.user.emailVerified,
            uid: cUser.user.uid,
        });
    }

    onClickPrintBTN(e) {
        e.preventDefault();
        console.log(theLoginUser());
        // console.log(firebase.auth().currentUser);
    }

    onClickLogoutBTN(e) {
        e.preventDefault();

        logoutRemoveCookie();
        firebase.auth().signOut()

        // rerender navbar
        this.setState({
            isLogout: true
        });

        // redirect
        this.props.history.push({ pathname: '/' });
    }


    render() {
        return (
            <React.Fragment>

                <NAVBAR isLogin={!this.state.isLogout} />

                <div className="bgdiv">
                 <img   
                     alt=""
                     src={bgimg}
                     className="bgimg"
                 />
                </div>

                <Card className='account_card'>
                    <Card.Body className='account_cardBody'>
                        <Card.Title>
                            <h1>Hey, {this.state.displayName}!</h1>
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            <h5>How's your journey here~</h5>
                        </Card.Subtitle>
                        <Card.Text className='account_info my-5'>
                            <h6>Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.email}</h6>
                            <h6>Verified: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.verified ? 'true' : 'false'}</h6>
                            <h6>UID: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.uid}</h6>
                        </Card.Text>

                        <div className='account_blank'/>
                        
                        <Button className='account_button my-2' variant="danger" onClick={this.onClickLogoutBTN}>Sign Out</Button>
                        <Button className='account_button my-2' onClick={this.onClickPrintBTN}>Print Cookies</Button>

                    </Card.Body>
                </Card>

            </React.Fragment>
        )
    }
}

export default withRouter(Account);
