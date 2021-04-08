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

import bsCustomFileInput from 'bs-custom-file-input';
import axios from 'axios';
import FormData from 'form-data';

class Upload extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'Untitled',
            succeed: 2, //0 false, 1 true, 2 null
            err: null,
            uploading: false
        };
    }

    componentDidMount() {
        bsCustomFileInput.init();
    }
    
    onChangeFileInput(e) {
        e.preventDefault();
        this.setState({
            succeed: 2
        });
    }

    onChangeFileName(e) {
        e.preventDefault();
        this.setState({
            name: e.target.value,
        });
    }

    onClickUploadBTN(e) {
        e.preventDefault();
        
        this.setState({
            uploading: true
        });

        let fileInput= document.querySelector('[type=file]');

        if (fileInput.files[0] != null) {

            // upload
            let data = new FormData();
            data.append('file', fileInput.files[0], this.state.name);

            let config = {
                method: 'post',
                url: 'https://api.cloudflare.com/client/v4/accounts/' + process.env.REACT_APP_CLOUDFLARE_ACCOUNT_ID + '/stream',
                headers: {
                    'Authorization': 'Bearer ' + process.env.REACT_APP_CLOUDFLARE_STREAM_TOKEN,
                    'Content-Type': 'multipart/form-data'
                },
                data: data
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    this.setState({
                        succeed: 1,

                    });
                })
                .catch((error) => {
                    this.setState({
                        succeed: 0,

                    });
                    console.log(error);
                })
                .finally(() => {
                    // reset state
                    this.setState({
                        name: 'Untitled',
                        uploading: false,
                        // succeed: 2
                    });
                });

        } else {
            // TODO: 弹窗
        }
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

                    <Form className="mx-auto my-auto">
                        <Form.File id="formcheck-api-custom" custom>
                            <Form.File.Input accept="video/mp4" placeholder="Not selected" onChange={this.onChangeFileInput.bind(this)}/>
                            <Form.File.Label data-browse="Button text">
                            </Form.File.Label>
                            <Form.Text className="text-muted">
                                Select your video to upload.
                            </Form.Text>
                           
                            {/* {this.state.succeed ? (
                                <Form.Control.Feedback type="valid">Ready to upload!</Form.Control.Feedback>
						    ) : (
                                <Form.Control.Feedback type="invalid">Select a file</Form.Control.Feedback>
                            )} */}
                        </Form.File>

                        <Form.Group className="mt-4">
                            {/* <Form.Label>Name the video</Form.Label> */}
                            <Form.Control type="text" placeholder="Untitled" onChange={this.onChangeFileName.bind(this)}/>
                            <Form.Text className="text-muted">
                                Choose a name for this video.
                            </Form.Text>
                        </Form.Group>

                        <Button className='mt-4' variant="primary" onClick={this.onClickUploadBTN.bind(this)}>Upload</Button>{' '}
                        
                        {(this.state.succeed === 2) ? (
                            <div/>
                        ) : (
                            <div className='mt-4'>
                                {(this.state.succeed === 1) ? (
                                    <Alert variant='success'>
                                        We got your video!
                                    </Alert>
                                ) : (
                                    <Alert variant='danger'>
                                        Something is wrong, please try again.
                                    </Alert>
                                )}
                            </div>
                        )}

                        {this.state.uploading ? (
                            <div className='mt-4'>
                                <Alert variant='warning'>
                                    ... Please wait while we upload.
                                </Alert>
                            </div>
                        ) : (
                            <div/>
                        )}
                        
                    </Form>

                    
                </Container>

                

            </React.Fragment>
        );
    }
}



export default Upload;
