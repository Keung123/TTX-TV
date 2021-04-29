
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
import './Manage.css';
import bgimg from '../../res/assets/sofa.jpg';

import ManageList from './ManageList';

class Manage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newClicked: false,
            refreshLock: true,
            newName: '',
            newDesc: '',
            newKey: '',
            listData: [],
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

    onChangeRoomName(e) {
        e.preventDefault();
        this.setState({
            newName: e.target.value,
        });
    }

    onChangeRoomDesc(e) {
        e.preventDefault();
        this.setState({
            newDesc: e.target.value,
        });
    }

    onChangeRoomKey(e) {
        e.preventDefault();
        this.setState({
            newKey: e.target.value,
        });
    }

    onClickCreateBTN(e) {
        e.preventDefault();
        // update to backend
        let params = {
            name: this.state.newName,
            desc: this.state.newDesc,
            key: this.state.newKey,
            userUID: theLoginUser().user.uid,
        }

        let postCFG = {
            method: 'post',
            url: process.env.REACT_APP_BACKEND_ADDRESS + '/room/create',
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

        let getCFG = {
            method: 'get',
            url: process.env.REACT_APP_BACKEND_ADDRESS 
                + '/user/hosts?uid=' + theLoginUser().user.uid
                + '&name=' + theLoginUser().user.displayName,
        }

        axios(getCFG)
            .then( res => {
                this.setState({
                    listData: res.data,
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

                <Card className='manage_card mx-auto'>
                    <Card.Body>
                        <h3 className='manage_title'>Rooms You Hosted</h3>
                        <Card.Subtitle className="mb-2 text-muted">Manage your events here.</Card.Subtitle>
                        
                        <div className='manage_blank'/>
                        
                        <ManageList data={this.state.listData}/>

                        {this.state.newClicked ? (
                            <Form className='manage_form'>
                                <Card border="info" bg="light">
                                    <Card.Header>
                                        <h6>New Room</h6>
                                    </Card.Header>

                                    <Card.Body>    
                                        <Form.Group controlId='1'>
                                            <Form.Label column sm="2" >
                                                Name:
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control required type="text" placeholder="New Event Room" onChange={this.onChangeRoomName.bind(this)}/>
                                                <Form.Control.Feedback type="invalid">Room need a name.</Form.Control.Feedback>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group controlId='2'>
                                            <Form.Label column sm="2">
                                                Description:
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control required type="text" placeholder="A room for our event." onChange={this.onChangeRoomDesc.bind(this)}/>
                                                <Form.Control.Feedback type="invalid">Room need a description.</Form.Control.Feedback>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group controlId='3'>
                                            <Form.Label column sm="2">
                                                Invite Code:
                                        </Form.Label>
                                            <Col sm="10">
                                                <Form.Control required type="password" placeholder="A passcode allow others to enter" onChange={this.onChangeRoomKey.bind(this)}/>
                                                <Form.Control.Feedback type="invalid">Room need an invite code.</Form.Control.Feedback>
                                            </Col>
                                        </Form.Group>
                                    </Card.Body>
                                </Card>

                                <div className='manage_add'>
                                    <Button className='manage_addBTN mr-3' onClick={this.onClickBackBTN.bind(this)} variant="dark">Back</Button>
                                    <Button type="submit" className='manage_addBTN mr-3' onClick={this.onClickCreateBTN.bind(this)}>Create</Button>
                                </div>
                            </Form>
                        ) : (
                            <div className='manage_form'>
                                <div className='manage_add'>
                                    <Button className='manage_addBTN mr-3' onClick={this.onClickNewBTN.bind(this)} variant="info">New</Button>
                                </div>
                            </div>
                        )}



                    </Card.Body>
                </Card>

            </React.Fragment>
        );
    }
}

export default withRouter(Manage);
