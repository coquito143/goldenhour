import React from 'react';
import { unixTimeConvert, round } from '../services/api-helper'
import ReactTooltip from 'react-tooltip'

class DayDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.day_id,
      high: null,
      low: null,
      description: "",
      golden_hour1: "",
      golden_hour2: "",
      blue_hour: "",
      visibility: null,
      wind_speed: null,
      precip_amt: null,
      precip_percent: null
    }
  }

  getDayDetails = async () => {
    let forecastArr = this.props.forecast;
    const newArr = forecastArr.filter((dayObj) => {
      return dayObj.valid_date === this.props.day_id;
    });

    if (newArr.length > 0) {
      let golden_hour1 = unixTimeConvert(newArr[0].sunrise_ts);
      let golden_hour2 = unixTimeConvert(newArr[0].sunset_ts);
      let rounded = round(newArr[0].precip, 1);
      rounded = rounded + ` inches`;
      // const precip_percent = newArr[0].pop + `% chance precipitation`
      const wind_speed = newArr[0].wind_spd + ` MPH`;
      const visibility = newArr[0].vis + ` miles`;

      this.setState({
        date: newArr[0].valid_date,
        high: newArr[0].high_temp,
        low: newArr[0].low_temp,
        description: newArr[0].weather.description,
        golden_hour1,
        golden_hour2,
        visibility,
        wind_speed,
        precip_amt: rounded,
        precip_percent: newArr[0].pop
      })
    }
  }


  componentDidMount = () => {
    this.getDayDetails()
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.day_id !== this.props.day_id) {
      this.getDayDetails()
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
            <li>
            <ReactTooltip place="top" delayHide={1000} type="dark" effect="float"> <span>The golden hour in photography is the first or last hour of sunlight in a day that photographers often aim to shoot in, since the sun’s position produces a soft and warm light with longer shadows. Portraits and landscapes benefit the most from this special light</span></ReactTooltip>
              Morning Golden Hour: {this.state.golden_hour1} <i class="material-icons" data-tip="React-tooltip">info</i></li>
            <li>Afternoon Golden Hour: {this.state.golden_hour2}</li>
            
            <li>Visibility: {this.state.visibility}</li>
            <li>Wind Speed: {this.state.wind_speed}</li>
            {!!this.state.precip_amt && !!this.state.precip_percent &&
              <li>Prob of Precipitation: {this.state.precip_percent} %</li>}
            {!!this.state.precip_amt && !!this.state.precip_percent &&
              <li>Precipitation Amount: {this.state.precip_amt}</li>}
          </ul>
        </div >
      )
    }
    else return (<div></div>)


  }
}

export default DayDetail
