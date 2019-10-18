import React from 'react';
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Forecast from './components/Forecast'
import Input from './components/Input'
import { getForecast } from './services/api-helper'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      forecast: [],
      zipcode: null
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
        forecast
      }
      )
    }
    else alert("Invalid zip code")
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          {this.state.zipcode && this.state.forecast.length ?
            <Forecast forecast={this.state.forecast} />
            :
            <Input
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />}
          {/* <DayDetail /> */}
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
