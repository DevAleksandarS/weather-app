import React, { useState } from "react";
import {
  WiDaySunny,
  WiNightAltCloudy,
  WiRain,
  WiStormShowers,
  WiSnow,
} from "react-icons/wi";
import useLocation from "./custom-hooks/useLocation";
import "./style-css/style.css";

const geoAPI = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f07331321fmshd5412fa13f915dap11e0aajsn701c098c1ef7",
    "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
  },
};

function App() {
  const [weather, setWeather] = useState(WiNightAltCloudy);
  const [citySearch, setCitySearch] = useState("");
  const [cityLatLon, setCityLatLon] = useState({ lat: "", lon: "" });

  const [lat, lon] = useLocation();

  function FindLatLonCity() {
    fetch(
      `https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?city=${citySearch}&accept-language=en&polygon_threshold=0.0`,
      geoAPI
    )
      .then((response) => response.json())
      .then((response) =>
        setCityLatLon({ lat: response[0].lat, lon: response[0].lon })
      )
      .catch((err) => console.error(err));
  }

  return (
    <div className="container">
      <h1 className="logo">WeatherAPP</h1>
      <div className="flex">
        <input
          onChange={(e) => setCitySearch(e.target.value)}
          className="input"
          type="text"
          placeholder="City..."
        ></input>
        <button onClick={() => FindLatLonCity()} className="btn-find">
          Find
        </button>
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
