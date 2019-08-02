import React from 'react';
import ReactDOM from 'react-dom'
import DailyHours from './DailyHours.jsx'

const WeeklyHours = (props) => {
    if(typeof(props.hours) !== 'string'){
        let keyIndex = 0;
        return (
            <div>
                {Object.entries(props.hours).map((day)=>{
                    return(
                        <div key ={keyIndex}> 
                            <DailyHours hours = {day} key = {++keyIndex%7}/>
                        </div> 
                    )
                })
                }
            </div>
        )
    }
    return <div></div>
}

export default WeeklyHours;