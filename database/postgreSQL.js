const pg = require('pg')
const password = require('../.config.js').DATABASE_PASSWORD

const pool = new pg.Pool()
pool.on('error', (err) => {
  console.error('An idle client has experienced an error', err.stack)
})

const client = new pg.Client({
  user: 'jared',
  host: 'localhost',
  database: 'testing',
  password: password,
  port: 9000,
});
client.connect(function (err){
  if(err)
      console.log(err);
  else
      console.log("Connected!");
});

const getRestaurants = (request, response) => {
  client.query('SELECT * FROM restaurants ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getRestaurantById = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('SELECT * FROM restaurants WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createRestaurant = (request, response) => {
  const { name, email } = request.body

  client.query('INSERT INTO restaurants (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateRestaurant = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  client.query(
    'UPDATE restaurants SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteRestaurant = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('DELETE FROM restaurants WHERE id = $1', [id], (error, results) => {
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