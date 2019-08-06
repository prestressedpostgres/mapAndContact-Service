
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const postgres = require('../database/postgreSQL.js')
const loader = require('../loaderio.js').loader;

const app = express();
const PORT = 4000;
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('../client/public'));


app.get('/all/restaurants', postgres.getRestaurants)
app.get('/pg/restaurant/:id', postgres.getRestaurantById)

app.get(`/${loader}`, (req, res) => {
  console.log(loader)
  res.status(200).send(loader)
})

app.post('/pg/restaurants', postgres.createRestaurant)
app.put('/pg/restaurant/:id', postgres.updateRestaurant)
app.delete('/pg/restaurant/:id', postgres.deleteRestaurant)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
