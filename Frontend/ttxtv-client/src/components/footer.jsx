/** 
 * @file React component, footer displayed at bottom of the page.
 */

import React from 'react';
import {
    Col,
    Container,
    Row
} from 'react-bootstrap';


import nodejs from '../res/assets/nodejs.svg';
import react from '../res/assets/react.svg';
import bootstrap from '../res/assets/bootstrap.svg';
import firebase from '../res/assets/firebase.svg';
import cloudflare from '../res/assets/cloudflare.svg';

const footerStyle = {
    backgroundColor: "#E8E8E8",
    position: "fixed",
    bottom: "0",
    height: "145px",
    width: "100%",
    lineHeight: "65px"
}

const FOOTER = () => {
    return (
        <footer style={footerStyle} className="font-small pt-4 mt-4">
            <Container className="col-md-8 ml-5">
                <Row>
                    <Col className="col-lg">
                        <hr className="mt-1 mb-7" />
                        <h5 className="mb-4 heading-2">Powered by</h5>

                    </Col>

                    <Col className="col-lg">
                        <div className="form-inline mt-4 mr-sm-2">
                            <img
                                alt=""
                                src={react}
                                width="35"
                                className="br3"
                            />
                            <a className="mx-3 d-block" href="https://reactjs.org/">React</a>
                        </div>

                    </Col>

                    <Col className="col-lg">
                        <div className="form-inline mt-4 mr-sm-2">
                            <img
                                alt=""
                                src={bootstrap}
                                width="35"
                                className="br3"
                            />
                            <a className="mx-3 d-block" href="https://getbootstrap.com/">Bootstrap</a>
                        </div>

                    </Col>


                    <Col className="col-lg">
                        <div className="form-inline mt-4 mr-sm-2">
                            <img
                                alt=""
                                src={nodejs}
                                width="35"
                                className="br3"
                            />
                            <a className="mx-3 d-block" href="https://nodejs.org/">Node JS</a>
                        </div>

                    </Col>


                    <Col className="col-lg">
                        <div className="form-inline mt-4 mr-sm-2">
                            <img
                                alt=""
                                src={firebase}
                                width="35"
                                className="br3"
                            />
                            <a className="mx-3 d-block" href="https://firebase.google.com/">Firebase</a>
                        </div>

                    </Col>

                    <Col className="col-lg">
                        <div className="form-inline mt-4 mr-sm-2">
                            <img
                                alt=""
                                src={cloudflare}
                                width="35"
                                className="br3"
                            />
                            <a className="mx-3 d-block" href="https://www.cloudflare.com/">Cloudflare</a>
                        </div>

                    </Col>
                </Row>
            </Container>
            <div className="footer-copyright text-center py-3">
                <Container fluid>
                    &copy; {new Date().getFullYear()} Copyright: Tiaotiaoxiong TV all rights reserved.
                </Container>
            </div>
        </footer>
    );
};




export default FOOTER;
