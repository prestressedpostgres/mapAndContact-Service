const getDaysHours = require('./getDaysHours.js');

let SampleHours = {
    "Monday":[""],
    "Tuesday":[""],
    "Wednesday":["11:00-14:30","17:00-22:00"],
    "Thursday":["11:00-14:30","17:00-22:00"],
    "Friday":["11:00-14:30","17:00-23:00"],
    "Saturday":["10:00-14:30","17:00-23:00"],
    "Sunday":["10:00-14:30","17:00-22:00"]
}

test('returns an array', () => {
    expect(Array.isArray(getDaysHours(1, SampleHours))).toBe(true);
  });

test('returns an array', () => {
    expect(Array.isArray(getDaysHours(1, SampleHours))).toBe(true);
});
  