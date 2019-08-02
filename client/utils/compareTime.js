

const compareTime = (currentTimeArray, timeStringArray) => {
    let currentHour = currentTimeArray[1]
    let currentMinute = currentTimeArray[2]
    let isOpen;
    if(timeStringArray[0] === ''){
        return isOpen = false
    }
    timeStringArray.forEach( (timeString) => {
        let openHour = Number(timeString.split('-')[0].split(':')[0])
        let openMinute = Number(timeString.split('-')[0].split(':')[1])
        let closeHour = Number(timeString.split('-')[1].split(':')[0])
        let closeMinute = Number(timeString.split('-')[1].split(':')[1])
        if (currentHour > openHour && currentHour < closeHour) {
            return isOpen = true
        }
        if (currentHour === openHour && currentMinute >= openMinute) {
            return isOpen = true
        }
        if (currentHour === closeHour && currentMinute <= closeMinute) {
            return isOpen = true
        }
    })
    return isOpen
}

export default  compareTime