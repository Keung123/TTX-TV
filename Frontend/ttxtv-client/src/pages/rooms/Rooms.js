
import React from 'react';
import {
    Button,
    Card,
    Form,
    Col,
} from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import axios from 'axios';

import { theLoginUser } from '../../utils/cookies';

import NAVBAR from '../../components/navbar';
import './Rooms.css';
import bgimg from '../../res/assets/popcorn.jpg';

import RoomsList from './RoomsList';

class Rooms extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newClicked: false,
            refreshLock: true,
            newID: '',
            newKey: '',
            listDataRooms: [],
            listDataHosts: [],
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

    onClickEnterBTN(e) {
        e.preventDefault();
        // update to backend
        let params = {
            rid: this.state.newID,
            key: this.state.newKey,
            uid: theLoginUser().user.uid,
        }

        
        let postCFG = {
            method: 'post',
            url: process.env.REACT_APP_BACKEND_ADDRESS + '/room/join',
            data: params,
        }

        axios(postCFG)
            .then( res => {
                this.setState({
                    refreshLock:false,
                    newClicked: false,
                });
            }).catch( err => {
                console.log(err);
            })        
    }
    
    updateList() {

        let getCFG1 = {
            method: 'get',
            url: process.env.REACT_APP_BACKEND_ADDRESS 
                + '/user/rooms?uid=' + theLoginUser().user.uid,
        }

        let getCFG2 = {
            method: 'get',
            url: process.env.REACT_APP_BACKEND_ADDRESS 
                + '/user/hosts?uid=' + theLoginUser().user.uid
                + '&name=' + theLoginUser().user.displayName,
        }

        axios(getCFG1)
            .then( res1 => {
                
                this.setState({
                    listDataRooms: res1.data,
                    refreshLock: true,
                });

            }).catch( err => {
                
                console.log(err);
            })

        axios(getCFG2)
            .then( res2 => {
                this.setState({
                    listDataHosts: res2.data,
                    refreshLock: true,
                });
            }).catch( err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.updateList();
    }

    componentDidUpdate() {
        if(!this.state.refreshLock) {
            this.updateList();
            window.location.reload();
        }
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

                <Card className='rooms_card mx-auto' text='light' bg='dark'>
                    <Card.Body>
                        <h3 className='manage_title'>Rooms You Joined</h3>
                        <Card.Subtitle className="mb-2 text-muted">Let's have fun!</Card.Subtitle>
                        
                        <div className='manage_blank'/>
                        
                        <div className='rooms_list_outer_block'>
                            <RoomsList data={this.state.listDataRooms} ccolour='light'/>
                            <RoomsList data={this.state.listDataHosts} ccolour='secondary'/>
                        </div>
                        

                        {this.state.newClicked ? (
                            <Form className='manage_form'>
                                <Card bg="secondary" text='light'>
                                    <Card.Header>
                                        <h6>Join a Room</h6>
                                    </Card.Header>

                                    <Card.Body>    
                                        <Form.Group controlId='1'>
                                            <Form.Label column sm="2" >
                                                Room ID:
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control required type="text" placeholder="Enter the room ID you received." onChange={this.onChangeRoomID.bind(this)}/>
                                                <Form.Control.Feedback type="invalid">Room need an ID.</Form.Control.Feedback>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group controlId='3'>
                                            <Form.Label column sm="2">
                                                Invite Code:
                                        </Form.Label>
                                            <Col sm="10">
                                                <Form.Control required type="password" placeholder="Enter the Invite Code you received." onChange={this.onChangeRoomKey.bind(this)}/>
                                                <Form.Control.Feedback type="invalid">Room need an invite code.</Form.Control.Feedback>
                                            </Col>
                                        </Form.Group>
                                    </Card.Body>
                                </Card>

                                <div className='manage_add'>
                                    <Button className='manage_addBTN mr-3' onClick={this.onClickBackBTN.bind(this)} variant="secondary">Back</Button>
                                    <Button type="submit" className='manage_addBTN mr-3' onClick={this.onClickEnterBTN.bind(this)}>Join</Button>
                                </div>
                            </Form>
                        ) : (
                            <div className='manage_form'>
                                <div className='manage_add'>
                                    <Button className='manage_addBTN mr-3' onClick={(this.onClickNewBTN.bind(this))} variant="info">Join</Button>
                                </div>
                            </div>
                        )}



                    </Card.Body>
                </Card>

            </React.Fragment>
        );
    }
}

export default withRouter(Rooms);
