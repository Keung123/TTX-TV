import React from 'react';
import {
    Button,
    Card,
} from 'react-bootstrap';

import copy from "copy-to-clipboard";  
import axios from 'axios';

import { theLoginUser } from '../../utils/cookies';

import './Manage.css';


class ManageListItem extends React.Component {

    onClickCopyBTN(e) {
        e.preventDefault();

        let message = "You are invited to " 
                    + this.props.by + "'s room, use room id: ["
                    + this.props.rID + "] / invite code: ["
                    + this.props.rKey + "] to join !!!";

        copy(message);
    }

    onClickDeleteBTN(e) {
        e.preventDefault();  

        let params = {
            roomID: this.props.rID,
            uid: theLoginUser().user.uid,
        }

        let postCFG = {
            method: 'post',
            url: process.env.REACT_APP_BACKEND_ADDRESS + '/room/delete',
            data: params,
        }

        axios(postCFG)
            .then( res => {
                window.location.reload();
            }).catch( err => {
                console.log(err);
            })
    }

    render() {
        return (
            <React.Fragment>     
                <Card text="white" bg="dark" className='manage_list_item_card'>
                    <Card.Header>
                        <h5>{this.props.name}</h5>
                    </Card.Header>

                    <Card.Body>
                        <p>{this.props.desc}</p>

                        <div className='manage_add'>
                            <Button className='manage_list_item_btn mr-2' variant="light" onClick={this.onClickCopyBTN.bind(this)}>
                                Copy
                            </Button>

                            <Button className='manage_list_item_btn' variant="danger" onClick={this.onClickDeleteBTN.bind(this)}>
                                Delete
                            </Button>
                        </div>
                        
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}

export default ManageListItem;
