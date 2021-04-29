
import React from 'react';

import ManageListItem from './MangeListItem';

import './Manage.css';


class ManageList extends React.Component {

  
    render() {
        return (
            <React.Fragment>     
                {this.props.data.map( (res, index) => {
                    return <ManageListItem index={index} name={res.name} desc={res.desc} rID={res.rID} rKey={res.key} by={res.by}/>

                })}
            </React.Fragment>
        );
    }
}

export default ManageList;
