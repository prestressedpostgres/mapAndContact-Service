import React from 'react';
import ReactDOM from 'react-dom'
import formatTimeString from '../../utils/formatTime';
import getDaysHours from '../../utils/getDaysHours';


const Hours = (props) => {
    return (
        <div onClick = {()=>(props.clickHandler())}>
            {/* toggles based on current time vs hrs of operation */}
           {props.isOpen &&  <span>OPEN NOW</span>}
           {!props.isOpen && <span>CLOSED</span>}
            <span> · </span>
            
            {/* {props.isOpen && typeof(props.weekHours)!=='string' &&<span>{formatTimeString(getDaysHours(props.timeAndDay, props.weekHours))}</span>} */}
        </div>
    )
}

export default Hours;