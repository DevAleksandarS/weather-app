import React, { useState } from "react";
import {
  WiDaySunny,
  WiNightAltCloudy,
  WiRain,
  WiStormShowers,
  WiSnow,
} from "react-icons/wi";
import "./style-css/style.css";

function App() {
  const [weather, setWeather] = useState(WiNightAltCloudy);

  return (
    <div className="container">
      <h1 className="logo">WeatherAPP</h1>
      <div className="flex">
        <input className="input" type="text" placeholder="City..."></input>
        <button className="btn-find">Find</button>
      </div>
      <p className="text">Current weather in: </p>
      <p className="city-name">Gradiška</p>
      <p className="date">15/07/21</p>
      <p className="weather-icon">{weather}</p>
      <p className="celsius">23°C</p>
    </div>
  );
}

export default App;
