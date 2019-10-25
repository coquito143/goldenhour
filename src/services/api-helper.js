import axios from 'axios';

export const getForecast = async (zipcode) => {

  const URL = `https://api.weatherbit.io/v2.0/forecast/daily?&postal_code=${zipcode}&country=US&units=I&days=6&key=9352b22c629c4910a59b6f750e7dcc55`
  // your axios call 
  const response = await axios.get(URL);
  let sixDays = response.data.data;
  debugger;
  return sixDays;
}

export const getCity = async (zipcode) => {
  const URL = `http://ZiptasticAPI.com/${zipcode}`;
  const response = await axios.get(URL);
  let city = response.data.city + `, ` + response.data.state;
  return city;
}

export const unixTimeConvert = (timestamp) => {

  const dt = new Date(timestamp * 1000);

  let hr = dt.getHours();
  let m = dt.getMinutes();
  let mstring = m.toString();
  const mlength = mstring.length;
  if (mlength === 1) { mstring = `0` + mstring };
  var s = dt.getSeconds();
  
  if (s > 30) m++;
  if (hr > 12) {
    const time = (hr - 13) + ':' + mstring + ' - ' + (hr-12) + ':' + mstring + ' PM EST' ;
    return time;
  }
  else if (hr === 12) {
    const time =  '11:' + mstring + 'AM - 12:' + mstring + ' PM EST';
  }
  else {
    const time = hr + ':' + mstring + ' - ' + (hr + 1) + ':'
    + mstring + ' AM EST';
    return time;
  }

}

export const round = (value, precision) => {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}