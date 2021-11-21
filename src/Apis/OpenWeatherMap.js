import axios from "axios"


const API_KEY  = 'ee88357c39bb3af3b66ac6d38313fa58'
const appIdQueryParam = `appid=${API_KEY}`;

axios.defaults.baseURL = "http://api.openweathermap.org/data/2.5/"


function getCurrentWeather(location){
    return axios.get(
        `weather?q=${location}&units=metric&${appIdQueryParam}`
    )
}
function getForecastWeather(lat,lon){
    return axios.get(
        `onecall?lat=${lat}&lon=${lon}&units=metric&${appIdQueryParam}`
    )
}
function getCurrentWeatherByLocation(lat,lon){
    return axios.get(
        `find?lat=${lat}&lon=${lon}&units=metric&cnt=5&${appIdQueryParam}`
    )
}
export {
    getCurrentWeather,
    getForecastWeather,
    getCurrentWeatherByLocation,
}