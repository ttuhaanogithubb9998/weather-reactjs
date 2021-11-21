import React from 'react'
import './Style/Forecast.scss';
class ForecastByDay extends React.Component {
    
    render() {
        const forecast = this.props.forecast.map((f, i) => {
            const url = `http://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`
            let day = new Date(f.dt * 1000).getDate();
            let month = new Date(f.dt * 1000).getMonth()+1;
            return (
                <div className="forecast-item" key={i}>
                    <div>
                        <p className="forecast-item-hour">{day}/{month}</p>
                        <p>{f.temp.day}°C</p>
                    </div>
                    <img src={url} alt={f.weather[0].description} />
                    <p>{f.weather[0].main}</p>
                </div>
            )
        })
        return <div className="forecast"><div className="forecast-content">{forecast}</div></div>
    }
}
export default ForecastByDay;