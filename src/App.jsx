import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WeatherComponent from './component/WeatherComponent/WeatherComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <React.Fragment>
      <WeatherComponent/>
    </React.Fragment>
  )
}

export default App
