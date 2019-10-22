import React from 'react'
import { Link } from 'react-router-dom'

function Forecast(props) {
  return (

    <div id="forecast-div">

      <h2>Six Day Forecast</h2>

      {props.forecast.map(day => (
        <Link to={`/${day.valid_date}`} key={day.valid_date}>
          <div class="day-div" id={day.valid_date}>
            <h3>{day.valid_date}</h3>
            <ul>
              <li>High: {day.high_temp}</li>
              <li>Low: {day.low_temp}</li>
              <li>Description: {day.weather.description}</li>
              <li>Cloud Cover %: {day.clouds}</li>
              <li>Visibility: {day.vis}</li>
              <li>Wind Speed: {day.wind_spd}</li>
              <li>Amount of Precipitation: {day.precip}</li>
              <li>Prob of Precipitation: {day.pop}</li>
            </ul>
          </div >
        </Link>
      ))
      }
    </div>
  )
}

export default Forecast;