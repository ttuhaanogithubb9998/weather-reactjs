import React from 'react'
import './Style/Forecast.scss';
class Forecast extends React.Component {


    render() {
        const forecast = this.props.forecast.map((f, i) => {
            const url = `http://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`
            let ampm = "AM"
            let hour = new Date(f.dt * 1000).getHours();
            if (hour > 12) {
                hour = hour - 12;
                ampm = "PM"
            }
            return (
                <div className="forecast-item" key={i}>
                    <div>
                        <p className="forecast-item-hour">{hour}:00 {ampm}</p>
                        <p>{f.temp}°C</p>
                    </div>
                    <img src={url} alt={f.weather[0].description} />
                    <p>{f.weather[0].main}</p>
                </div>
            )
        })
        return <div className="forecast"><div className="forecast-content">{forecast}</div></div>
    }

}
export default Forecast;