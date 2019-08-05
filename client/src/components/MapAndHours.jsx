import React from 'react';
import ReactDOM from 'react-dom';
import Hours from './Hours.jsx';
import Location from './Location.jsx';
import Phone from './Phone.jsx';
import WebLink from './WebLink.jsx';
import Directions from './Directions.jsx';
import axios from 'axios';
import WeeklyHours from './WeeklyHours.jsx';
import compareTime from '../../utils/compareTime.js';
import getDaysHours from '../../utils/getDaysHours.js';
// axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

class MapAndHours extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 9900010,
      currentRestaurant: 'CENTRO',
      restaurantData: null,
      dailyHoursHidden: true,
      dayAndTime: this.setDate(),
      isOpen: true
    }
  }

  componentDidMount() {
    this.loadRestaurant()
      .then(
        (data) => {
          this.setRestaurantData(data)
          return data[0]
        }
      )
      .then(
        (restaurant) => {
          this.setIsOpen(restaurant)
        }
      )
  }

  setDate() {
    let now = new Date()
    let time = [];
    time.push(now.getDay())
    time.push(now.getHours())
    time.push(now.getMinutes())
    return time
  }

  setIsOpen(restaurant) {
    let currentTimeArray = this.state.dayAndTime
    let dayStringArray = getDaysHours(currentTimeArray[0], restaurant.hoursOpen)
    let isOpen = compareTime(currentTimeArray, dayStringArray)
    this.setState({
      isOpen: isOpen
    })
  }

  setRestaurantData(data) {
    this.setState({
      restaurantData: data[0]
    });
  }

  loadRestaurant() {
    //TODO change route to docker container 
    return axios.get(`/pg/restaurant/${this.state.id}`)
      .then(function (response) {
        return (response.data);
      });
  }

  toggleDailyHours() {
    this.setState({
      dailyHoursHidden: !this.state.dailyHoursHidden
    })
  }

  handleHoursClick() {
    this.toggleDailyHours()
  }
  render() {
    return (
      <div className="contactBar">
        <div>
          <Hours
            clickHandler={this.toggleDailyHours.bind(this)}
            dayAndTime={this.state.dayAndTime}
            isOpen={this.state.isOpen}
            weekHours={this.state.restaurantData && this.state.restaurantData.hoursOpen || 'Loading'}
          />
        </div>
        <div>
          {!this.state.dailyHoursHidden && <WeeklyHours hours={this.state.restaurantData && this.state.restaurantData.hoursOpen || 'Loading'} />}
        </div>
        <div>
          <Location location={this.state.restaurantData && this.state.restaurantData.address || 'Loading'} />
        </div>
        <div>
          <Phone phone={this.state.restaurantData && this.state.restaurantData.phone || 'Loading'} />
        </div>
        <div>
          <WebLink website={this.state.restaurantData && this.state.restaurantData.website || 'Loading'} />
        </div>
        <div>
          <Directions />
        </div>
      </div>
    )
  }
}

export default MapAndHours