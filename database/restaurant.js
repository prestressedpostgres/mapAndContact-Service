const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  website: String,
  openTable: Boolean,
  openTableLink: String,
  hoursOpen: Object,
  hoursClose: Object
});
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

let save = (restaurant, callback) => {

  Restaurant.find({ name: restaurant.name }).exec((err, result) => {
    if (err) return err;
    if (result.length) return;
    else {
      let newRestaurants = new Restaurant({
        name: restaurant.name,
        address: restaurant.address,
        phone: restaurant.phone,
        website: restaurant.website,
        openTable: restaurant.openTable,
        openTableLink: restaurant.openTableLink,
        hoursOpen: restaurant.hoursOpen,
        hoursClose: restaurant.hoursClose
      })
      newRestaurants.save(err => {
        if (err) console.log(err)
      })
    }
  })
}

let deleteEntry = (restaurant, callback) => {
  
  Restaurant.find({ name: restaurant.name }).exec((err, result) => {
    if (err) throw err;
    if (result.length === 0) throw new Error('No data!');
    else {
      console.log(result)
      Restaurant.deleteOne({ 'name': `${restaurant.name}` })
        .then(result => console.log(`Deleted ${result.deletedCount} item.`))
        .catch(err => console.error(`Delete failed with error: ${err}`))
    }
  });
}

module.exports = {save, Restaurant, deleteEntry}
