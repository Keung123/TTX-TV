/** 
 * @file Home Page of the app
 */

import React from 'react';
import {
    Container,
} from 'react-bootstrap';

import NAVBAR from '../../components/navbar';

import './Home.css';

import bgimg from '../../res/assets/movienightfull.jpg';

function Home() {
    return (
        <React.Fragment>

            <NAVBAR />

            <div className="bgdiv">
                <img
                    alt=""
                    src={bgimg}
                    className="animatedbgimg"
                />
            </div>
            
            <Container fluid>
                <h1 className="animatedbigtitle">Host Your Cloud Movie Night!{' '}</h1>
            </Container>

        </React.Fragment>
    );
}

export default Home;
