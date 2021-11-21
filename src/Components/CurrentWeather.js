import './Style/CurrentWeather.scss';

import React from 'react';

class CurrentWeather extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.name !== nextProps.name) {
          return true;
        }
        return false;
      }


    render() {
        // console.log(this.props.name)
        const url = `http://openweathermap.org/img/wn/${this.props.icon}@4x.png`
        const temp = this.props.currentTemperature;
        const description = this.props.description;
        const feelsLike = this.props.feelsLike;

        return (
            <div className={"current-weather "+this.props.them}>
                <div className={"current-weather-title"}>{this.props.name}</div>
                <div className="current-weather-content">
                    <div className="current-weather-text">
                        <p className="current-weather-temp"> {temp||"0"}°C </p>
                        <p className="current-weather-description"> {description||"0"} </p>
                    </div>
                    <div><img className="current-weather__icon" alt={description} src={url}></img></div>
                </div>
                <div className="current-weather__feels-like">Feels Like {feelsLike||0}°C</div>
            </div>
        );
    }
}

export default CurrentWeather;