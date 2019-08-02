
const formatMilitaryTime = (time) => {
    time = time.split(':');

    var hours = Number(time[0]);
    var minutes = Number(time[1]);

    var timeValue;

    if (hours > 0 && hours <= 12) {
        timeValue= "" + hours;
    } else if (hours > 12) {
        timeValue= "" + (hours - 12);
    } else if (hours == 0) {
        timeValue= "12";
    }
 
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  
    timeValue += (hours >= 12) ? " PM" : " AM"; 

return timeValue
}

const formatTimeString = (timeString) => {
    let timeDisplay = '';
    if (timeString === '') {
        timeDisplay += 'CLOSED';
    }
    else {
        let openTime = timeString.split('-')[0];
        let closeTime = timeString.split('-')[1];
        timeDisplay += `${formatMilitaryTime(openTime)} - ${formatMilitaryTime(closeTime)}`
        }
    return timeDisplay;
}

export default formatTimeString;

