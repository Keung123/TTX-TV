/** 
 * @file Testing Page of the app, FOR DEV ONLY.
 */

import React from 'react';
import {
    Container,
    Button
} from 'react-bootstrap';




function Account() {
    return (
        <React.Fragment>
            {/* <div className="bgdiv">
                 <img
                     alt=""
                     src={bgimg}
                     className="bgimg"
                 />
             </div> */}

            <Container fluid className="TestingConTainer">
                <h1>My account</h1>
            </Container>

        </React.Fragment>
    );
}

export default Account;
