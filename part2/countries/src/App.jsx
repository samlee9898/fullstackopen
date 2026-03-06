import { useState, useEffect } from 'react'
import countryService from './services/countries'

function App() {
  // an array to store countries i'd get from getAllCountries function
  const [countries, setCountries] = useState([])

  // controlled component for search field
  const [country, setCountry] = useState('')

  //  country data of a country I'd get from getOneCountry function
  const [countryData, setCountryData] = useState(null)

  //  weather data of a country I'd get from getWeather function
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {

    countryService
      // returns a Promise which will return all countries info if succeeded
      .getAllCountries()
      .then(data => {
        const names = data.map(c => c.name.common)

        // initial set up for the state variable countries
        setCountries(names)
        console.log(names)
        console.log(import.meta)
      })
  }, [])

  const filteredCountries = countries.filter(c =>
    c.toString().toLowerCase().includes(country.toLowerCase())
  )

  const selectedCountry = filteredCountries.length === 1 ? filteredCountries[0] : null

  useEffect(() => {
    if (!selectedCountry) {
      return
    }
    countryService
      .getOneCountry(selectedCountry)
      .then(data => {
        setCountryData(data)
      })
    countryService
      .getLonAndLat(selectedCountry)
      .then(coords => {
        return countryService.getWeather(coords.lon, coords.lat)
      })
      .then(weatherData => {
        setWeatherData(weatherData)
      })
  }, [selectedCountry])

  const handleClick = (name) => {
    setCountry(name)
  }

  return (
    <div>
      <span>find countries </span>
      <input type="text" value={country} onChange={e => {
        setCountry(e.target.value)
      }}/>
      {
        filteredCountries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : filteredCountries.length !== 1 ? (
        filteredCountries.map(name => (
          <div key={name}>
            {name}
            <button type="button" onClick={() => handleClick(`${name}`)}>Show</button>
          </div>
        ))
      ) : countryData && weatherData ? (
        <div>
          <h1>{countryData.name.common}</h1>
          {
            countryData.capital.map(cap => {
              return <p key={cap}>Capital {cap}</p>
            })
          }
          <p>Area {countryData.area}</p>
          <h2>Languages</h2>
          <ul>
            {
              Object.values(countryData.languages).map(lang => {
                return <li key={lang}>{lang}</li>
              })
            }
          </ul>
          <img src={`${Object.values(countryData.flags)[0]}`}></img>
          <h2>Weather in {countryData.capital[0]}</h2>
          <p>Temperature {weatherData.temp} Celsius</p>
          <img src={weatherData.iconUrl} alt='weather icon'/>
          <p>Wind {weatherData.wind} m/s</p>
        </div>
      ) : (null)
      }
    </div>
  )
}

export default App
