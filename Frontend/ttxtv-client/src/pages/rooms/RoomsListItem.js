import React from 'react';
import {
    Card,
} from 'react-bootstrap';

import './Rooms.css';

import { enterRoom } from '../../utils/cookies';

class RoomListItem extends React.Component {

    onClickEnterBTN(e) {
        e.preventDefault();

        let rid = this.props.rID

        enterRoom(rid);

        window.location.href = '/mediaRoom';
        // window.open('/mediaRoom', '_blank');
    }   


    render() {
        return (
            <React.Fragment>     
                <Card text="dark" bg={this.props.ccolour} className='rooms_list_item_card' onClick={this.onClickEnterBTN.bind(this)}>
                    <Card.Header>
                        <h5>{this.props.name}</h5>
                    </Card.Header>

                    <Card.Body>
                        <p>{this.props.desc}</p>

                        <div className='manage_add'>
                        </div>
                        
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}

export default RoomListItem;
