import axios from 'axios';

export const getForecast = async (zipcode) => {

  const URL = `https://api.weatherbit.io/v2.0/forecast/daily?&postal_code=${zipcode}&country=US&units=I&days=6&key=9352b22c629c4910a59b6f750e7dcc55`
  // your axios call 
  const response = await axios.get(URL);
  const sixDays = response.data.data;
  return sixDays
}