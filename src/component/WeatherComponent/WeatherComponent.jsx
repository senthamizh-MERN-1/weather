import React, { useEffect, useState } from 'react'
import axios from 'axios'
const WeatherComponent = () => {
  const [location, setLocation] = useState(null);
  const [placeName, setPlaceName] = useState('')
  const [current, setCurrent] = useState(null)
  const [condition, setCondition] = useState([])
  const [weatherLocation, setWeatherLocation] = useState([])

  useEffect(() => {
    handleLocationClick()
  }, [])

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation(`${latitude},${longitude}`);
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    calling(location)
  }


  function error() {
    console.log("Unable to retrieve your location");
    alert("Unable to retrieve your location")
  }

  async function calling(place) {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=e2e85ac9741847679ca115257231309&q=${place}`)
    console.log(response.data);
    const currentData = response.data.current
    const locationData = response.data.location
    console.log(currentData)
    setCurrent(currentData)
    setCondition(currentData.condition)
    setWeatherLocation(locationData)
  }

  const getWeatherHandle = () => {
    calling(placeName)
  }

  return (

    <React.Fragment>
      <input
        type='text'
        placeholder='Enter City Name'
        onChange={(e) => setPlaceName(e.target.value)}
        value={placeName}

      />
      <button
        onClick={getWeatherHandle}

      >WeatherCheck</button>
      {current && <div className='card'>
        <div className='container-card'>
          <div className='place-name'>{weatherLocation.name}</div>
          <div>Temperature c : {current.temp_c}</div>
          <div>Temperature F : {current.temp_f}</div>
          <div>Humidity : {current.humidity}</div>
          <div className='cloud'>Cloud : {condition.text}</div>

          <img src={`https:${condition.icon}`} />

        </div>
      </div>}
    </React.Fragment>

  )
}

export default WeatherComponent