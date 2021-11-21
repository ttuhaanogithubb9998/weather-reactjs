import './App.scss';
import React from 'react';

import SearchBar from './Components/SearchBar';
import ByLocation from './Components/ByLocation';
import CurrentWeather from './Components/CurrentWeather';
import Forecast from './Components/Forecast';
import ForecastByDay from './Components/ForecastByDay';

import { getForecastWeather, getCurrentWeather, getCurrentWeatherByLocation } from "./Apis/OpenWeatherMap.js"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lon: "",
      location: "",
      name: "",
      temp: "",
      feelsLike: "",
      description: "",
      icon: "",
      hourlyForecast: [],
      dailyForecast: [],
      style: '',
      hour: true,
    }

    this.getLocation();
  }
  async setS(lat, lon) {
    const { data } = await getCurrentWeatherByLocation(lat, lon);
    const forecastRes = await getForecastWeather(lat, lon);
    this.setState({
      lat: lat,
      lon: lon,
      name: data.list[0].name,
      location: data.list[0].name,
      temp: data.list[0].main.temp,
      feelsLike: data.list[0].main.feels_like,
      description: data.list[0].weather[0].description,
      icon: data.list[0].weather[0].icon,
      dailyForecast: forecastRes.data.daily,
      hourlyForecast: forecastRes.data.hourly,
      style: this.setStyle(data.list[0].weather[0].icon)
    })
  }
  async getLocation() {
    const _this = this;
    const request = await fetch("https://ipinfo.io/json?token=c6c93119d84d05")
      .then(
        (response) => response.json()
      )
      .then(
        (jsonResponse) => ({ lat: jsonResponse.loc.substr(0, 7), lon: jsonResponse.loc.substr(8, 15) })
      )

    this.setS(request.lat, request.lon);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
    function showPosition(position) {
      console.log("o")
      _this.setS(position.coords.latitude, position.coords.longitude);
    }
  }


  setStyle(icon) {
    switch (icon) {
      case "01d":
      case "02d":
      case "03d":
      case "04d":
        return "them1"
      default:
        return "them2"
    }
  }


  onInputChange(e) {
    this.setState({
      location: e.target.value
    })
  }
  onInputLatChange(e) {
    this.setState({
      lat: e.target.value
    })
  }
  onInputLonChange(e) {
    this.setState({
      lon: e.target.value
    })
  }

  async onFormSubmit(e) {
    const { data } = await getCurrentWeather(this.state.location);
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const forecastRes = await getForecastWeather(lat, lon);

    this.setState({
      name: data.name,
      lat: lat,
      lon: lon,
      temp: data.main.temp,
      feelsLike: data.main.feels_like,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      hourlyForecast: forecastRes.data.hourly,
      dailyForecast: forecastRes.data.daily,
      style: this.setStyle(data.weather[0].icon)
    })
  }
  async onLocationFormSubmit(e) {
    this.setS(this.state.lat,this.state.lon)
  }

  render() {
    return (
      <div className="App">
        <SearchBar
          location={this.state.location}
          onInputChange={e => this.onInputChange(e)}
          onFormSubmit={() => this.onFormSubmit()}
        />
        <ByLocation
          lat={this.state.lat}
          lon={this.state.lon}
          onInputLatChange={e => this.onInputLatChange(e)}
          onInputLonChange={e => this.onInputLonChange(e)}
          onLocationFormSubmit={() => this.onLocationFormSubmit()}
        />
        <CurrentWeather
          currentTemperature={this.state.temp}
          feelsLike={this.state.feelsLike}
          description={this.state.description}
          icon={this.state.icon}
          them={this.state.style}
          name={this.state.name}
        />
        <div className="App_toggle-button">
          <button onClick={() => this.setState({ hour: !this.state.hour })}>{(this.state.hour && "Theo Ngày") || "Theo Giờ"}</button>
        </div>
        {this.state.hour && <Forecast forecast={this.state.hourlyForecast} />}
        {!this.state.hour && <ForecastByDay forecast={this.state.dailyForecast} />}
      </div>
    );
  }
};
export default App;
