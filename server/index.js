const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const database = require('../database/restaurant.js')
const db = require('../database/index.js');
const postgres = require('../database/postgreSQL.js')

const app = express();
const PORT = 4000;
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('../client/public'));


app.get('/all/restaurants', postgres.getRestaurants)
app.get('/pg/restaurant/:id', postgres.getRestaurantById)
app.post('/pg/restaurants', postgres.createRestaurant)
app.put('/pg/restaurant/:id', postgres.updateRestaurant)
app.delete('/pg/restaurant/:id', postgres.deleteRestaurant)


app.post('/add/restaurant', (req, res) => {
  database.save(req.body);
  res.send(console.log('data has been added to contacts'))
})

app.delete('/delete/restaurant', (req, res) => {
  database.deleteEntry(req.body)
  res.send(console.log('entry deleted from database'))
})
//take req.body, pass into .find function at db, take response,
//send to props, and pass
app.get('/api/contact/:name', function(req, res) {
    db.findRestaurantData(req.params.name, (dbResponse)=>{
      res.status(200).send(dbResponse)
    })
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
