import React from 'react';
import {
    Card,
} from 'react-bootstrap';

import axios from 'axios';
import { theRoom } from '../../utils/cookies';

class MediaListItem extends React.Component {

    onClickSelectBTN(e) {
        e.preventDefault();
        
        let params = {
            rid: theRoom(),
            vlink: this.props.vlink,
        }

        let postCFG = {
            method: 'post',
            url: process.env.REACT_APP_BACKEND_ADDRESS + '/room/play',
            data: params,
        }

        axios(postCFG)
            .then( res1 => {
                window.location.reload();
            }).catch( err => {
                
                console.log(err);
            })
    }   


    render() {
        return (
            <React.Fragment>     
                <Card text="light" bg='primary' className='mroom_list_item_card my-4' onClick={this.onClickSelectBTN.bind(this)}>

                    <Card.Body>
                        <Card.Title>
                            {this.props.name}
                        </Card.Title>
                        
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}

export default MediaListItem;
