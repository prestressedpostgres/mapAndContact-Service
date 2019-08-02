const getDaysHours = require('./getDaysHours.js');
const formatTimeString = require('./formatTime.js');

const getCurrentHourDisplay = (timeArray, hoursObject, isOpen) => {
    let displayHours = "";
    if (isOpen) {
        let currentHour = timeArray[1]
        let currentMinute = timeArray[2]
        let openHours =  getDaysHours(timeArray[0], hoursObject);
        openHours.forEach( (timeString) => {
            let openHour = Number(timeString.split('-')[0].split(':')[0])
            let openMinute = Number(timeString.split('-')[0].split(':')[1])
            let closeHour = Number(timeString.split('-')[1].split(':')[0])
            let closeMinute = Number(timeString.split('-')[1].split(':')[1])
            if (currentHour > openHour && currentHour < closeHour) {
                return  displayHours += formatTimeString(timeString)
            }
            if (currentHour === openHour && currentMinute >= openMinute) {
                return displayHours += formatTimeString(timeString)
            }
            if (currentHour === closeHour && currentMinute <= closeMinute) {
                return displayHours += formatTimeString(timeString)
            }
        })
    }
    return displayHours;
}

module.exports = getCurrentHourDisplay