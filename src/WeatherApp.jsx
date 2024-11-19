//Import useState and axios.
import React, { useState } from 'react';
import axios from 'axios';

function WeatherApp() {
  //Use state hooks to store weather data and location input.
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  //API url with a dynamic location input and a fixed API key.
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=5aa21ef611935c32a53121fbe95f1f7a`;

  //Get the current date and hour for forecast calculations.
  var date = new Date();
  var hours = date.getHours();

  //Function to search for weather data when the 'Enter' key is pressed.
  const searchLocation = (event) => {
    if (event.key == 'Enter') {
      axios.get(url).then((response) => {
        //Update the state with API response.
        setData(response.data);
      })
      .catch((error) => {
        //Display an error message.
        alert(error.response.data.message)
      });
      //Clear the input field.
      setLocation('');
    }
  };

  //Determine the weather condition.
  const weatherInfo = (data.list ? data.list[0].weather[0].main : null);

  //Update the background image based on the weather condition.
  if (weatherInfo == 'Clear') {
    document.getElementsByTagName('body')[0].style.backgroundImage = 'url(src/assets/clear.jpg)';
  }
  else if (weatherInfo == 'Clouds') {
    document.getElementsByTagName('body')[0].style.backgroundImage = 'url(src/assets/cloudy.jpg)';
  }
  else if (weatherInfo == 'Rain') {
    document.getElementsByTagName('body')[0].style.backgroundImage = 'url(src/assets/rain.jpg)';
  }
  else if (weatherInfo == 'Thunderstorm') {
    document.getElementsByTagName('body')[0].style.backgroundImage = 'url(src/assets/thunder.jpg)';
  }
  else if (weatherInfo == 'Snow') {
    document.getElementsByTagName('body')[0].style.backgroundImage = 'url(src/assets/snow.jpg)';
  }
  else if (weatherInfo == 'Mist') {
    document.getElementsByTagName('body')[0].style.backgroundImage = 'url(src/assets/mist.jpg)';
  }

  //Display a search bar and the location's 12-hour forecast table, humidity, wind speed, and visibility.
  return (
    <div className="weather-app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyDown={searchLocation}
        />
      </div>
      <div className="container">
        <div className="header">
          {data.city ? <p className="dropshadow">{data.city.name}</p> : <p>No Location</p>}
        </div>
        <div className="temperature">
          {data.list ? <h1 className="dropshadow">{data.list[0].main.temp.toFixed()}°C</h1> : <h1>--</h1>}
        </div>
        <div className="description">
          {data.list ? <p className="dropshadow">{data.list[0].weather[0].main}</p>: null}
        </div>
        <div className="feels-like">
          {data.list ? <p className="dropshadow">Feels like: {data.list[0].main.feels_like.toFixed()}°C</p> : null}
        </div>
        <div className="high-low">
          {data.list ? <p className="dropshadow">H: {data.list[0].main.temp_max.toFixed()}°C</p>: null}
          {data.list ? <p className="dropshadow">L: {data.list[0].main.temp_min.toFixed()}°C</p>: null}
        </div>
        <div className="hourly-forecast">
          {data.list ? 
            <table>
              <caption> <h3 className="dropshadow">12-HOUR FORECAST</h3></caption>
            <tbody>
              <tr className="dropshadow">
                <td>Now</td>
                <td>{hours+3 < 24 ? <>{(hours+3)%12 == 0 ? 12 : (hours+3)%12}PM</> : <>{(hours+3)%12 == 0 ? 12 : (hours+3)%12}AM</>}</td>
                <td>{hours+6 < 24 ? <>{(hours+6)%12 == 0 ? 12 : (hours+6)%12}PM</> : <>{(hours+6)%12 == 0 ? 12 : (hours+6)%12}AM</>}</td>
                <td>{hours+9 < 24 ? <>{(hours+9)%12 == 0 ? 12 : (hours+9)%12}PM</> : <>{(hours+9)%12 == 0 ? 12 : (hours+9)%12}AM</>}</td>
                <td>{hours+12 < 24 ? <>{(hours+12)%12 == 0 ? 12 : (hours+12)%12}PM</> : <>{(hours+12)%12 == 0 ? 12 : (hours+12)%12}AM</>}</td>
              </tr>
              <tr className="dropshadow">
                <td><img src={`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`}></img></td>
                <td><img src={`https://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png`}></img></td>
                <td><img src={`https://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png`}></img></td>
                <td><img src={`https://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png`}></img></td>
                <td><img src={`https://openweathermap.org/img/wn/${data.list[4].weather[0].icon}@2x.png`}></img></td>
              </tr>
              <tr>
                <td><p className="dropshadow">{data.list[0].main.temp.toFixed()}°C</p></td>
                <td><p className="dropshadow">{data.list[1].main.temp.toFixed()}°C</p></td>
                <td><p className="dropshadow">{data.list[2].main.temp.toFixed()}°C</p></td>
                <td><p className="dropshadow">{data.list[3].main.temp.toFixed()}°C</p></td>
                <td><p className="dropshadow">{data.list[4].main.temp.toFixed()}°C</p></td>
              </tr>
            </tbody>
          </table> : null}
        </div>
        {data.list ? <div className="widgets">
          <div className="humidity">
            <h3 className="dropshadow">Humidity</h3>
            <h4 className="dropshadow">{data.list[0].main.humidity}%</h4>
          </div>
          <div className="wind-speed">
            <h3 className="dropshadow">Wind Speed</h3>
            <h4 className="dropshadow">{data.list[0].wind.speed.toFixed()} KPH</h4>
          </div>
          <div className="visibility">
            <h3 className="dropshadow">Visibility</h3>
            <h4 className="dropshadow">{((data.list[0].visibility)/1000).toFixed()} KM</h4>
          </div>
        </div> : null}
      </div>
    </div>)
}

//Export the WeatherApp app.
export default WeatherApp