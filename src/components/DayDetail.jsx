import React from 'react';
import { unixTimeConvert, round } from '../services/api-helper'

class DayDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.day_id,
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
    if (this.state.high) {
      return (
        <div class="day-detail-div" id={this.state.date}>
          <h3>{this.state.date}</h3>
          <ul>
            {/* <li>High: {this.state.high}</li>
              <li>Low: {this.state.low}</li>
              <li>Description: {this.state.description}</li> */}
            <li>Sunset: {this.state.sunrise}</li>
            <li>Sunrise: {this.state.sunset}</li>
            <li>Visibility: {this.state.visibility}</li>
            <li>Wind Speed: {this.state.wind_speed}</li>
            {!!this.state.precip_amt && !!this.state.precip_percent &&
              <li>Amount of Precipitation: {this.state.precip_amt}</li> &&
              <li>Prob of Precipitation: {this.state.precip_percent}</li>}
          </ul>
        </div >
      )
    }
    else return (<div class="day-div"></div>)


  }
}

export default DayDetail
