import React from 'react'
import { Link } from 'react-router-dom'
import { round } from '../services/api-helper'

function Forecast(props) {
  return (

    <div id="forecast-div">

      <h2>Six Day Forecast: select a day to view photography conditions</h2>

      {props.forecast.map(day => (
        <Link to={`/${day.valid_date}`} key={day.valid_date}>
          <div class="day-div" id={day.valid_date}>
            <h3>{day.valid_date}</h3>
            <ul>
              <li>High: {round(day.high_temp, 0)} &#8457;</li>
              <li>Low: {round(day.low_temp, 0)} &#8457;</li>
            </ul>
            <div class="weather-icon-div">
            <img src={require(`../img/${day.weather.icon}.png`)} />
              <p>{day.weather.description}</p>
              </div>
              {/* <li>Cloud Cover %: {day.clouds}</li>
              <li>Visibility: {day.vis}</li>
              <li>Wind Speed: {day.wind_spd}</li>
              <li>Amount of Precipitation: {day.precip}</li>
              <li>Prob of Precipitation: {day.pop}</li> */}
            
          </div >
        </Link>
      ))
      }
    </div>
  )
}

export default Forecast;