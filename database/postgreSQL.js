const pg = require('pg')
const password = require('../.config.js').DATABASE_PASSWORD


//helps handle concurrent connections
const pool = new pg.Pool()
pool.on('error', (err) => {
  console.error('An idle client has experienced an error', err.stack)
})

//new client with my credentials 
const client = new pg.Client({
  user: '',
  host: 'localhost',
  database: 'postgres',
  password: password,
  port: 9000,
});

client.connect(function (err) {
  if (err)
    console.log(err);
  else
    console.log("Connected!");
});

//gets all restaurants from the database -- do not recommend using
const getRestaurants = (request, response) => {
  client.query('SELECT id FROM postgresrestaurants ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//gets a restaurant by id
const getRestaurantById = (request, response) => {
  var id = request.params.id;
  console.log(id)
  client.query(`SELECT * FROM postgresrestaurants WHERE id = '${id}'`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//creates a new restaurant. Only allows user to post if the id does not already exist
const createRestaurant = (request, response) => {
  client.query(`INSERT INTO postgresrestaurants (id, name, address, phone, website, openTable, openTableLink, hoursOpen) VALUES (${request.body.id},\ 
    '${request.body.name}', '${request.body.address}', '${request.body.phone}', '${request.body.website}',\
    '${request.body.openTable}', '${request.body.openTableLink}', '${request.body.hoursOpen}')`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${request.body.id}`)
    })
}

//updates a restaurant using the restaurant's id
const updateRestaurant = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, address, phone, website, openTable, openTableLink, hoursOpen } = request.body

  client.query(
    `UPDATE postgresrestaurants SET name = $1, address = $2, phone = $3, website = $4, openTable = $5, openTableLink = $6, hoursOpen = $7 WHERE id = ${id}`,
    [name, address, phone, website, openTable, openTableLink, hoursOpen],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

//deletes a restaurant using the restaurant's id
const deleteRestaurant = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('DELETE FROM postgresrestaurants WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
}


