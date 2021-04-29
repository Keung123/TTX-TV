
import React from 'react';

import RoomsListItem from './RoomsListItem';

import './Rooms.css';


class RoomsList extends React.Component {

  
    render() {
        return (
            <React.Fragment>     
                {this.props.data.map( (res, index) => {
                    return <RoomsListItem index={index} name={res.name} desc={res.desc} rID={res.rID} by={res.by} ccolour={this.props.ccolour}/>
                })}
            </React.Fragment>
        );
    }
}

export default RoomsList;
