import React, { useState, useReducer } from "react";
import useLocation from "./custom-hooks/useLocation";
import "./style-css/style.css";

const weatherAPI = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f07331321fmshd5412fa13f915dap11e0aajsn701c098c1ef7",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VALUES":
      return {
        city: action.payload.data.location.name,
        date: action.payload.data.location.localtime.split(" ")[0],
        weatherIcon: action.payload.data.current.condition.icon,
        temp: action.payload.data.current.temp_c,
      };
    default:
      return state;
  }
};

function App() {
  const [citySearch, setCitySearch] = useState("");
  const [state, dispatch] = useReducer(reducer, {
    city: "",
    date: "",
    weatherIcon: "",
    temp: "",
  });

  const [lat, lon] = useLocation();

  if (citySearch === "") {
    fetch(
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${lat}%2C${lon}`,
      weatherAPI
    )
      .then((response) => response.json())
      .then((response) => {
        dispatch({ type: "SET_VALUES", payload: { data: response } });
      })
      .catch((err) => console.error(err));
  }

  const FindCityWeather = () => {
    fetch(
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${citySearch}`,
      weatherAPI
    )
      .then((response) => response.json())
      .then((response) => {
        dispatch({ type: "SET_VALUES", payload: { data: response } });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h1 className="logo">WeatherAPP</h1>
      <div className="flex">
        <input
          onChange={(e) => setCitySearch(e.target.value.replaceAll(" ", "%20"))}
          className="input"
          type="text"
          placeholder="City..."
        ></input>
        <button onClick={() => FindCityWeather()} className="btn-find">
          Find
        </button>
      </div>
      <p className="text">Current weather in: </p>
      <p className="city-name">{state.city}</p>
      <p className="date">{state.date}</p>
      <p className="weather-icon">
        <img
          className="weather-icon-img"
          src={state.weatherIcon}
          alt="Weather icon"
        ></img>
      </p>
      <p className="celsius">{state.temp}°C</p>
    </div>
  );
}

export default App;
