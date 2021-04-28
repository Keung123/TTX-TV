/** 
 * @file Login Page of the app.
 */

import React from 'react';
import {
    Card,
} from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import { StyledFirebaseAuth } from 'react-firebaseui';

import firebase from '../../services/Firebase';
import { theLoginUser, loginNewCookie } from '../../utils/cookies';

import NAVBAR from '../../components/navbar';

import './Login.css';
import bgimg from '../../res/assets/login_full.jpg';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLogin: false
        };
    }

    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                scopes: [
                //   'https://www.googleapis.com/auth/contacts.readonly'
                ],
                customParameters: {
                  // Forces account selection even when one account
                  // is available.
                  prompt: 'select_account'
                }
            },
            // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: true,
            },
            
        ],
        callbacks: {
            signInSuccessWithAuthResult: (currentUser, credential, redirectUrl) => {
                //credential and redirectUrl are both null
                // currentUser has structure like
                // currentUser : {
                //     user: { 
                //       uid: 'asdasd',
                //       .....
                //    },
                //    additionalUserInfo: {
                //      isNewUser: false
                //    }
                // }  

                loginNewCookie(currentUser);
                
                // rerender navbar
                this.setState({
                    isLogin: true
                });

                // Force to redirect
                return true;
            },
            signInFailure: (error) => {
                console.log('Error: ');
                console.log(error);   
            }
        },
    };


    render() {
        return (
            <React.Fragment>
                <div className="bgdiv">
                    <img
                        alt=""
                        src={bgimg}
                        className="bgimg"
                    />
                </div>

                <NAVBAR isLogin={this.state.isLogin} />

                <Card className='login_card mx-auto'>
                    <Card.Body>
                        <h1 className='login_title'>Welcome</h1>
                        <Card.Subtitle className="mb-2 text-muted">Sign in to unlock all features.</Card.Subtitle>

                        <StyledFirebaseAuth className='login_firebaseui' uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                        
                   
                    </Card.Body>
                </Card>

            </React.Fragment>
        );
    }
}

export default withRouter(Login);
