import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Forecast from './components/Forecast'
import Input from './components/Input'
import DayDetail from './components/DayDetail'
import { getForecast, getCity } from './services/api-helper'
import camera from '../src/img/camera.png'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      forecast: [],
      zipcode: null,
      showHome: false,
      date: null,
      city: ""
    }
  }

  handleChange = (event) => {
    // let name = event.target.name // tracks which input is being used
    let value = event.target.value // tracks the value being entered
    this.setState({
      zipcode: value
    }
    )
  }

  handleClick = () => {
    const showHome = !this.state.showHome;
    const showInput = !this.state.showInput;
    this.setState({
      showHome,
      showInput
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault(); // prevents the page from refreshing (default form behavior)

    //error handling to check for valid US zip code
    let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.state.zipcode);
    if (isValidZip) {
      const forecast = await getForecast(this.state.zipcode);
      const city = await getCity(this.state.zipcode);
      debugger;
      this.setState({
        forecast,
        city,
        showHome: true
      }
      )
    }
    else alert("Invalid zip code")
  }

  render() {
    return (

      <div class="App">
        <div class="sun"></div>
        <header>
          <h1><img src={camera} alt="camera icon" />  the Golden Hour</h1>
          <p>for creating magical photos</p>
          {this.state.showHome ? <p id="newzip" onClick={this.handleClick}>Enter New Zip Code</p> :

            <Input
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />}
        </header>
        <main>
          {this.state.zipcode && !!this.state.forecast.length &&
            <Route path='/' render={() =>
              <Forecast city={this.state.city} forecast={this.state.forecast} />} />
          }



          <Route path='/:day_id'
            render={(props) =>
              <DayDetail forecast={this.state.forecast} day_id={props.match.params.day_id} />}
          />
        </main>
        {this.state.forecast.length ?
          < div class="landscape hidden">
            <div class="hill foreground hidden">
              {this.state.zipcode && this.state.forecast.length &&
                <DayDetail
                  forecast={this.state.forecast}
                  date={this.state.date}
                />}
            </div>
            <div class="hill background hidden"> </div>
          </div>
          :
          < div class="landscape">
            <div class="hill foreground">
              {this.state.zipcode && this.state.forecast.length &&
                <DayDetail
                  forecast={this.state.forecast}
                  date={this.state.date}
                />}
            </div>
            <div class="hill background"> </div>
          </div>
        }
        <Footer />



      </div >
    );
  }
}

export default App;
