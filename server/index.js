const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

const db = require('../database/index.js');

const app = express();
const PORT = 3000;
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('../client/public'));



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
