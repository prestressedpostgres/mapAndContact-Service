const getDaysHours = (day, hoursObject) => {


    let daysArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    return hoursObject[daysArray[day]]
}
module.exports =  getDaysHours;