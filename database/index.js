const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost:27017/FEC';
const Restaurant = require('./restaurant.js').Restaurant

mongoose.connect(mongoUri, { useNewUrlParser: true });

let db = mongoose.connection

db.once('open', () => {
  console.log('you made a database connection')
}).on('error', (error) => {
  console.log(error);
})

const findRestaurantData = (restaurant,cb) => {
    Restaurant.find({name:restaurant},(err,doc)=>{
      if (err) {return cb(err, 'error finding restaurant to display')}
      return doc ;
    })
      .then((restaurantResult) => {
        return cb(restaurantResult)
      });
  };



module.exports = {db, findRestaurantData}