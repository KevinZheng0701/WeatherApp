import React, { useState } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar/Searchbar";
import Infocard from "./components/Infocard/Infocard";
const WEATHERAPIKEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

function App() {
  // Stores the weather details
  const [weather, setWeather] = useState(null);
  // Fetch the weather based on the lat and long
  const fetchWeather = async (lat, long) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${WEATHERAPIKEY}`
      );
      const data = await response.json();
      setWeather({
        lat: data.coord.lat,
        long: data.coord.lon,
        humidity: data.main.humidity,
        feels: covertKelToFar(data.main.feels_like),
        temperature: covertKelToFar(data.main.temp),
        max: covertKelToFar(data.main.temp_max),
        min: covertKelToFar(data.main.temp_min),
        country: data.sys.country,
        weather: data.weather,
      });
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  // Convert the temperature in kelvins to fahrenheit
  function covertKelToFar(temp) {
    return ((9 * (temp - 273.15)) / 5 + 32).toFixed(2);
  }

  return (
    <div>
      <h2>Welcome to weather finder!</h2>
      <h4>You can search for locations to find details of the weather.</h4>
      <Searchbar updateSearch={fetchWeather} />
      {weather && <Infocard {...weather} />}
    </div>
  );
}

export default App;
