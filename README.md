#SDC Contact Bar 


#An express route which returns all the restuarants in the postgreSQL database 
app.get('/all/restaurants', postgres.getRestaurants) 

#An express route which returns a restaurant from a postgreSQL database using an ID as a query
app.get('/pg/restaurant/:id', postgres.getRestaurantById)

#An express route which posts a restaurant to a postgreSQL database
app.post('/pg/restaurants', postgres.createRestaurant)

#An express route which updates a restaurant in a postgreSQL database
app.put('/pg/restaurant/:id', postgres.updateRestaurant)

#An express route which deletes a restaurant in a postgreSQL database
app.delete('/pg/restaurant/:id', postgres.deleteRestaurant)


#An express route which posts a restaurant to a mongo database
app.post('/add/restaurant', (req, res) => {
  database.save(req.body);
  res.send(console.log('data has been added to contacts'))
})

#An express route which deletes a restaurant from a mongo database
app.delete('/delete/restaurant', (req, res) => {
  database.deleteEntry(req.body)
  res.send(console.log('entry deleted from database'))
})

#An express route which returns a restaurant from a mongo database
app.get('/api/contact/:name', function(req, res) {
    db.findRestaurantData(req.params.name, (dbResponse)=>{
      res.status(200).send(dbResponse)
    })
});
