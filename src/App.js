import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Forecast from './components/Forecast'
import Input from './components/Input'
import DayDetail from './components/DayDetail'
import { getForecast } from './services/api-helper'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      forecast: [],
      zipcode: null,
      showHome: false
    }
  }

  handleChange = (event) => {
    let name = event.target.name // tracks which input is being used
    let value = event.target.value // tracks the value being entered
    this.setState({
      zipcode: value
    }
    )
  }

  handleSubmit = async (event) => {
    event.preventDefault(); // prevents the page from refreshing (default form behavior)

    //error handling to check for valid US zip code
    let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.state.zipcode);
    if (isValidZip) {
      const forecast = await getForecast(this.state.zipcode);
      this.setState({
        forecast,
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
        <Header
          showhome={this.state.showHome}
        />
        <main>
          {this.state.zipcode && this.state.forecast.length ?
            <Route exact path='/' render={() =>
              <Forecast forecast={this.state.forecast} />} />
            :
            <Route exact path='/' render={() =>
              <Input
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
              />}
            />
          }
          <Route path='/:day_id'
            render={(props) =>
              <DayDetail forecast={this.state.forecast} day_id={props.match.params.day_id} />}
          />
        </main>
        <div class="landscape">
          <div class="hill foreground"></div>
          <div class="hill background"> </div>
        </div>
        <Footer />



      </div>
    );
  }
}

export default App;
