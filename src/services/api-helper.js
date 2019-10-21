import axios from 'axios';

export const getForecast = async (zipcode) => {

  const URL = `https://api.weatherbit.io/v2.0/forecast/daily?&postal_code=${zipcode}&country=US&units=I&days=6&key=9352b22c629c4910a59b6f750e7dcc55`
  // your axios call 
  const response = await axios.get(URL);
  const sixDays = response.data.data;
  return sixDays
}

export const unixTimeConvert = (timestamp) => {

  const dt = new Date(timestamp * 1000);
  let hr = dt.getHours();
  let m = dt.getMinutes();
  var s = dt.getSeconds();
  if (s > 30) m++;
  if (hr > 12) {
    const time = (hr - 12) + ':' + m + ' PM';
    return time;
  }
  else {
    const time = hr + ':' + m + ' AM';
    return time;
  }

}

export const round = (value, precision) => {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}