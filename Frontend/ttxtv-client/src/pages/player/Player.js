/** 
 * @file Uploading Page of the app.
 */

import React from 'react';
import {
    Container,
    Button,
    Form,
    Alert
} from 'react-bootstrap';

import { Stream } from "@cloudflare/stream-react";

import './Player.css';

class Player extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            url: '',
            succeed: 2, //0 false, 1 true, 2 null
        };
    }

    onChangeURL(e) {
        e.preventDefault();
        this.setState({
            id: e.target.value,
        });
    }

    onClickPlayBTN(e) {
        e.preventDefault();
        this.setState({
            url: "https://iframe.videodelivery.net/" + this.state.id,
        })
    }


    render() {
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

                    <div >
                        <iframe
                            title='player'
                            src={this.state.url}
                            height="720"
                            width="1280"
                            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                            allowfullscreen="true"
                        ></iframe>
                    </div>

                    <Form className="ml-auto my-auto">

                        <Form.Group className="urlForm mt-5" >
                            <Form.Control type="text" placeholder=" " onChange={this.onChangeURL.bind(this)} />
                            <Form.Text className="text-muted">
                                Paste the URL of the video.
                            </Form.Text>
                        </Form.Group>

                    </Form>

                    <Button className='ml-2 mr-auto mt-2' variant="primary" onClick={this.onClickPlayBTN.bind(this)}>Play</Button>{' '}

                    {(this.state.succeed === 2) ? (
                        <div />
                    ) : (
                        <div className='mt-4'>
                            {(this.state.succeed === 1) ? (
                                <Alert variant='success'>
                                    There you are!
                                </Alert>
                            ) : (
                                <Alert variant='danger'>
                                    Something is wrong, please try again.
                                </Alert>
                            )}
                        </div>
                    )}

                </Container>



            </React.Fragment>
        );
    }
}



export default Player;
