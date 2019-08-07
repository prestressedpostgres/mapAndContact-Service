const getDaysHours = (day, hoursObject) => {

var newHoursObject = hoursObject.split(' ').join('')
var arrayOfTimeAndDay = newHoursObject.split('\n').join(' ').slice(2, newHoursObject.length-2).split(',').join('')

var newArr = [];
arrayOfTimeAndDay.split(' ').forEach(el => {
    newArr.push(el.split('day:'))
})

var usedHoursObject = {}
let daysArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
newArr.forEach((el, index) => {
    usedHoursObject[daysArray[index]] = [el[1]]
})

    return usedHoursObject[daysArray[day]]
}
module.exports =  getDaysHours;