import React from 'react';
import { unixTimeConvert, round } from '../services/api-helper'

class DayDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      high: null,
      low: null,
      description: "",
      sunrise: null,
      sunset: null,
      visibility: null,
      wind_speed: null,
      precip_amt: null,
      precip_percent: null
    }
  }

  componentDidMount = async () => {
    let forecastArr = this.props.forecast;
    const newArr = forecastArr.filter((dayObj) => {
      return dayObj.valid_date === this.props.day_id;
    });
   
    if (newArr.length > 0) {
      let sunrise = unixTimeConvert(newArr[0].sunrise_ts);
      let sunset = unixTimeConvert(newArr[0].sunset_ts);
      let rounded = round(newArr[0].precip, 1);
      rounded = rounded + ` inches`;
      // const precip_percent = newArr[0].pop + `% chance precipitation`
      const wind_speed = newArr[0].wind_spd + ` MPH`;
      const visibility = newArr[0].vis + ` miles`;
  
      this.setState({
        high: newArr[0].high_temp,
        low: newArr[0].low_temp,
        description: newArr[0].weather.description,
        sunrise,
        sunset,
        visibility,
        wind_speed,
        precip_amt: rounded,
        precip_percent: newArr[0].pop
      })
    }

  }  


  render() {
    if (this.state.day) {
      return (
        <div class="day-div" id={this.state.day.valid_date}>
          {/* <h3>{dayArr[0].valid_date}</h3>
            <ul>
              <li>High: {dayArr[0].high_temp}</li>
              <li>Low: {dayArr[0].low_temp}</li>
              <li>Description: {dayArr[0].weather.description}</li>
              <li>Sunset: {dayArr[0].sunrise_ts}</li>
              <li>Sunrise: {dayArr[0].sunset_ts}</li>
              <li>Visibility: {dayArr[0].vis}</li>
              <li>Wind Speed: {dayArr[0].wind_spd}</li>
              <li>Amount of Precipitation: {dayArr[0].precip}</li>
              <li>Prob of Precipitation: {dayArr[0].pop}</li>
            </ul> */}
        </div >
      )
    }
    else return (<div class="day-div"></div>)


  }
}

export default DayDetail
