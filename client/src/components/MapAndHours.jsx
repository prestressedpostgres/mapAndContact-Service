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
      id: 99000,
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
    window.history.pushState("","", `/pg/restaurant/${this.state.id}`)
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
    let dayStringArray = getDaysHours(currentTimeArray[0], restaurant.hoursopen)
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
        <div className="openNow"><div className='clock'><i className="far fa-clock"></i></div>
          <Hours
            clickHandler={(e) => this.toggleDailyHours(e)}
            dayAndTime={this.state.dayAndTime}
            isOpen={this.state.isOpen}
            weekHours={this.state.restaurantData && this.state.restaurantData.hoursopen || 'Loading'}
          />
        </div>
        <div>
          {!this.state.dailyHoursHidden && <WeeklyHours hours={this.state.restaurantData && this.state.restaurantData.hoursopen || 'Loading'} />}
        </div>
        <div className="address"><div className='coordinate'><i className="fas fa-map-marker-alt"></i></div>
          <Location location={this.state.restaurantData && this.state.restaurantData.address || 'Loading'} />
        </div>
        <div className="phone"><div className='telephone'><i className="fas fa-phone"></i></div>
          <Phone phone={this.state.restaurantData && this.state.restaurantData.phone || 'Loading'} />
        </div>
        <div className="link"><div className="window"><i className="far fa-window-maximize"></i></div>
          <WebLink website={this.state.restaurantData && this.state.restaurantData.website || 'Loading'} />
        </div>
        <div className="directionContainer"><div className="direction"><i className="fas fa-directions"></i></div>
          <Directions />
        </div>
      </div>
    )
  }
}

export default MapAndHours