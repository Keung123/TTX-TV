/** 
 * @file Testing Page of the app, FOR DEV ONLY.
 */

import React from 'react';
import {
    Container,
    Button
} from 'react-bootstrap';
import axios from 'axios';
import { theLoginUser } from '../../utils/cookies';

import NAVBAR from '../../components/navbar';

import './Testing.css';

import bgimg from '../../res/assets/blueprint.jpg';

function Testing() {
    return (
        <React.Fragment>

            <NAVBAR/>

            <div className="bgdiv">
                <img
                    alt=""
                    src={bgimg}
                    className="bgimg"
                />
            </div>

            <Container fluid className="TestingConTainer">
                <Button href="/upload" className="TestingBTN mx-auto my-auto" variant="warning">Upload Videos</Button>{' '}
                <Button href="/player" className="TestingBTN mx-auto my-auto" variant="warning">Stream Player</Button>{' '}
                <Button onClick={() => {
                        let currentUser = theLoginUser()

                        // update to backend
                        let params = {
                            displayName: currentUser.user.displayName,
                            uid: currentUser.user.uid,
                            email: currentUser.user.email,
                            verified: currentUser.user.emailVerified
                        }

                        axios.post(
                            process.env.REACT_APP_BACKEND_ADDRESS + '/user/createIfNotExist',
                            params
                        );
                    }} className="TestingBTN mx-auto my-auto" variant="info">Send User</Button>{' '}
            </Container>

        </React.Fragment>
    );
}

export default Testing;
