const mongoose = require('mongoose');
const mongoUri = process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/FEC';
const Restaurant= require('./restaurant.js')

mongoose.connect(mongoUri, { useNewUrlParser: true })
// .catch((err)=>{mongoose.connect(mongoUri, { useNewUrlParser: true })})

var db = mongoose.connection;

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