/** 
 * @file Testing Page of the app, FOR DEV ONLY.
 */

 import React from 'react';
 import {
    Col,
    Container,
    Row,
    Button
} from 'react-bootstrap';

import './Testing.css';

import bgimg from '../../res/assets/blueprint.jpg';
 
function Testing() {
    return (
        <React.Fragment>
            <div className="bgdiv">
                <img
                    alt=""
                    src={bgimg}
                    className="bgimg"
                />
            </div>
        
        <Container fluid className="TestingConTainer">
            <Button href="/upload" className="TestingBTN mx-auto my-auto" variant="warning">Upload Videos</Button>{' '}   
            <Button className="TestingBTN mx-auto my-auto" variant="warning">Stream Player</Button>{' '}            
        </Container>

        </React.Fragment>
    );
}
 
 export default Testing;
 