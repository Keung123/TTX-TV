
import React from 'react';

import MediaListItem from './MediaListItem';


class MediaList extends React.Component {

  
    render() {
        return (
            <React.Fragment>     
                {this.props.data.map( (res, index) => {
                    return <MediaListItem index={index} name={res.name} vlink={res.link}/>
                })}
            </React.Fragment>
        );
    }
}

export default MediaList;
