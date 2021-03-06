import React from 'react';
import ReactDOM from 'react-dom'
import formatTimeString from '../../utils/formatTime.js'


const DailyHours = (props) => {
    let keyIndex = 0;
    return (
        <div className="eachDay">
            <div className="weekAndHour">
                <div className='dayOfWeekAndDivider'>
                    <div className='dayOFWeek' >{props.hours[0]}:</div>
                    <div className='divider' ></div>
                    <div className='dailyHours'>{props.hours[1].map(openTime => (
                    formatTimeString(openTime))).map(hours => (
                        <div className="hours" key={keyIndex++}>{hours}</div>
                    ))}
                </div>
                </div>
            </div>
            
        </div>
    )
}

export default DailyHours;