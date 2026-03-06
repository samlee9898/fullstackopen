import axios from 'axios'

// openweathermap API KEY will be stored here
const api_key = import.meta.env.VITE_SOME_KEY

const fullstackBaseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

//37.5666791 lat
//126.9782914 lon

// ## use this to get the longitude and latitude of the city
// q(city name) required
// appid (API key) required
// limit (number of locations) optional
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit=5&appid={API key}
const geoCodingAPIBaseUrl = `https://api.openweathermap.org/geo/1.0/direct?`

const currentWeatherAPIBaseUrl = 'https://api.openweathermap.org/data/3.0/onecall?'

const openWeatherMapIconBaseUrl = 'https://openweathermap.org/payload/api/media/file/'

const getAllCountries = () => {
    return axios
        .get(`${fullstackBaseUrl}/all`)
        .then(response => response.data)
        .catch(error => {
            console.log('error in getAllCountries function', error)
            return
        })
}

const getOneCountry = (countryName) => {
    return axios
        .get(`${fullstackBaseUrl}/name/${countryName}`)
        .then(response => response.data)
        .catch(error => {
            console.log('error in getOneCountry function', error)
            return
        })
}

const getLonAndLat = (countryName) => {
    return axios
        .get(`${fullstackBaseUrl}/name/${countryName}`)
        .then(response => response.data)
        .then(result => {
            console.log(result)
            return axios
                .get(`${geoCodingAPIBaseUrl}q=${result.capital[0]}&limit=5&appid=${api_key}`)
                .then(response => response.data)
                .then(result => ({
                    lon: result[0].lon,
                    lat: result[0].lat
                }))
                .catch(error => {
                    console.log('error in calling geoCodingAPI', error)})
        .catch(error => {
            console.log('error in calling getLonAndLat function', error)
            return 
        })
    })
}

const getWeather = (lon, lat) => {
    return axios
        .get(`${currentWeatherAPIBaseUrl}lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
        .then(response => response.data)
        .then(result => ({
            temp: result.current.temp,
            wind: result.current.wind_speed,
            iconUrl: `${openWeatherMapIconBaseUrl}${result.current.weather[0].icon}.png`
        }))
        .catch(error => {
            console.log('error in getWeather function', error)
            return
        })
}

export default { getAllCountries, getOneCountry, getLonAndLat, getWeather }