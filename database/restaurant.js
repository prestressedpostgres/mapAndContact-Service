const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const restaurantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  address: String,
  phone: String,
  website: String,
  openTable: Boolean,
  openTableLink: String,
  hoursOpen: Object
});
const Restaurant = mongoose.model('Restaurant', restaurantSchema);


let saveToDB = (restaurant, callback) => {
    let newRestaurants = new Restaurant({
      id: restaurant.id,
      name: restaurant.name,
      address: restaurant.address,
      phone: restaurant.phone,
      website: restaurant.website,
      openTable: restaurant.openTable,
      openTableLink: restaurant.openTableLink,
      hoursOpen: restaurant.hoursOpen
    })
    newRestaurants.save(err => {
      if (err) console.log(err)
    })
}

let save = (restaurant, callback) => {

  // console.log(restaurant.id)
  Restaurant.find({ id: restaurant.id }).exec((err, result) => {
    // console.log(restaurant)
    if (err) return err;
    if (result.length) return;
    else {
      let newRestaurants = new Restaurant({
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        phone: restaurant.phone,
        website: restaurant.website,
        openTable: restaurant.openTable,
        openTableLink: restaurant.openTableLink,
        hoursOpen: restaurant.hoursOpen
      })
      newRestaurants.save(err => {
        if (err) console.log(err)
      })
    }
  })
}

let deleteEntry = (restaurant, callback) => {
  
  Restaurant.find({ id: restaurant.id }).exec((err, result) => {
    if (err) throw err;
    if (result.length === 0) throw new Error('No data!');
    else {
      console.log(result)
      Restaurant.deleteOne({ 'id': `${restaurant.id}` })
        .then(result => console.log(`Deleted ${result.deletedCount} item.`))
        .catch(err => console.error(`Delete failed with error: ${err}`))
    }
  });
}

module.exports = {save, Restaurant, deleteEntry, saveToDB}
