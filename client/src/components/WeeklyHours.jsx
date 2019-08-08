import React from 'react';
import ReactDOM from 'react-dom'
import DailyHours from './DailyHours.jsx'

const WeeklyHours = (props) => {

	var newHoursObject = props.hours.split(' ').join('')
	var arrayOfTimeAndDay = newHoursObject.split('\n').join(' ').slice(2, newHoursObject.length - 2).split(',').join('')

	var newArr = [];
	arrayOfTimeAndDay.split(' ').forEach(el => {
		newArr.push(el.split('day:'))
	})

	var usedHoursObject = {}
	let daysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	newArr.forEach((el, index) => {
		usedHoursObject[daysArray[index]] = [el[1]]
	})

	if (typeof (usedHoursObject) !== 'string') {
		let keyIndex = 0;
		return (
			<div className="hoursContainer">
				{Object.entries(usedHoursObject).map((day) => {
					return (
						<div key={keyIndex}>
							<DailyHours hours={day} key={++keyIndex % 7} />
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