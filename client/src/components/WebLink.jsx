import React from 'react';
import ReactDOM from 'react-dom';
import path from 'path';

const WebLink = (props) => {
    return (
        <div>
            <a href = {props.website}>{path.basename(props.website)}</a>
        </div>
    )
}

export default WebLink;