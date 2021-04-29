
import React from 'react';
import {
    Button,
    Card,
    Form,
    Alert
} from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import bsCustomFileInput from 'bs-custom-file-input';
import axios from 'axios';
import FormData from 'form-data';

import { theLoginUser, theRoom, exitRoom } from '../../utils/cookies';

import NAVBAR from '../../components/navbar';
import './MediaRoom.css';
import bgimg from '../../res/assets/cinema.jpg';

import MediaList from './MediaList';

class MediaRoom extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newClicked: false,
            refreshLock: true,
            uploading: false,
            succeed: 2, //0 false, 1 true, 2 null
            url: '',
            newID: '',
            newKey: '',
            fileName: 'Untitled',
            roomData: [],
            listMedias: [],
        };
    }

    onClickNewBTN(e) {
        e.preventDefault();
        this.setState({
            newClicked: true
        });
    }

    onClickBackBTN(e) {
        e.preventDefault();
        this.setState({
            newClicked: false
        });
    }

    onClickMedia(e) {
        e.preventDefault();
        this.setState({
            url: ''
        });
    }

    onChangeRoomID(e) {
        e.preventDefault();
        this.setState({
            newID: e.target.value,
        });
    }

    onChangeRoomKey(e) {
        e.preventDefault();
        this.setState({
            newKey: e.target.value,
        });
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
            fileName: e.target.value,
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
                    console.log(response.data);
                    this.setState({
                        succeed: 1,

                    });

                    // update to backend
                    let params = {
                        rid: theRoom(),
                        vlink: response.data.result.preview,
                        vname: this.state.fileName,
                    };

                    let postCFG = {
                        method: 'post',
                        url: process.env.REACT_APP_BACKEND_ADDRESS + '/media/upload',
                        data: params,
                    };

                    axios(postCFG)
                        .then( res => {
                            this.setState({
                                refreshLock:false,
                            });
                        }).catch( err => {
                            console.log(err);
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
          
        }
    }
    
    update() {

        let getCFG1 = {
            method: 'get',
            url: process.env.REACT_APP_BACKEND_ADDRESS 
                + '/room/details?rid=' + theRoom(),
        }

        let getCFG2 = {
            method: 'get',
            url: process.env.REACT_APP_BACKEND_ADDRESS 
                + '/room/medias?rid=' + theRoom(),
        }

        let getCFG3 = {
            method: 'get',
            url: process.env.REACT_APP_BACKEND_ADDRESS 
                + '/room/playing?rid=' + theRoom(),
        }


        axios(getCFG1)
            .then( res1 => {
                
                this.setState({
                    roomData: res1.data,
                    refreshLock: true,
                });

            }).catch( err => {
                
                console.log(err);
            });

        axios(getCFG2)
            .then( res2 => {
                this.setState({
                    listMedias: res2.data,
                    refreshLock: true,
                });
            }).catch( err => {
                console.log(err);
            });

        
        axios(getCFG3)
            .then( res3 => {
                this.setState({
                    url: res3.data,
                    refreshLock: true,
                });
            }).catch( err => {
                console.log(err);
            });
    }

    componentDidMount() {
        bsCustomFileInput.init();
        this.update();
    }

    componentDidUpdate() {
        if(!this.state.refreshLock) {
            this.update();
            window.location.reload();
        }
    }

    componentWillUnmount() {
        // exitRoom();
    }

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

                <NAVBAR isLogin={true} />

                <Card className='mroom_card mx-auto' text='light' bg='dark'>
                    <Card.Body>
                        <h3 className='manage_title'>{this.state.roomData.name}</h3>
                        <Card.Subtitle className="mb-2 text-muted">{this.state.roomData.desc}</Card.Subtitle>
                        
                        <div className='manage_blank'/>
                        
                        {/* <div className='rooms_list_outer_block'>
                            <RoomsList data={this.state.listDataRooms} ccolour='light'/>
                            <RoomsList data={this.state.listDataHosts} ccolour='secondary'/>
                        </div> */}
                        <div className='mroom_outer'>
                        <iframe
                            title='player'
                            src={this.state.url}
                            className = 'mroom_player'
                            
                            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                            allowfullscreen="true"
                        ></iframe>

                        <div className='mroom_list_div'>

                            <MediaList data={this.state.listMedias}/>
                            
                            {this.state.newClicked ? (
                                <Form className='manage_form'>
                                    <Card bg="secondary" text='light'>
                                        <Card.Header>
                                            <h6>Upload Content</h6>
                                        </Card.Header>

                                        <Card.Body>
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
                                            
                                        </Card.Body>
                                    </Card>

                                    <div className='manage_add'>
                                        <Button className='manage_addBTN mr-3' onClick={this.onClickBackBTN.bind(this)} variant="secondary">Back</Button>
                                        <Button type="submit" className='manage_addBTN mr-3' onClick={this.onClickUploadBTN.bind(this)}>Confirm</Button>
                                    </div>
                                </Form>
                            ) : (
                                <div className='manage_form'>
                                    <div className='manage_add'>
                                        <Button className='manage_addBTN mr-3' onClick={(this.onClickNewBTN.bind(this))} variant="info">Upload</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                        </div>


                    </Card.Body>
                </Card>

            </React.Fragment>
        );
    }
}

export default withRouter(MediaRoom);
