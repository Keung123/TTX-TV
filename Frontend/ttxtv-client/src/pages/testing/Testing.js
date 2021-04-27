/** 
 * @file Testing Page of the app, FOR DEV ONLY.
 */

import React from 'react';
import {
    Container,
    Button
} from 'react-bootstrap';

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
            </Container>

        </React.Fragment>
    );
}

export default Testing;
