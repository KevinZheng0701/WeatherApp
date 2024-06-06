import React, { useState, useEffect } from "react";
import "./Infocard.css";

const Infocard = (props) => {
  // Extract the details
  const {
    lat,
    long,
    humidity,
    feels,
    pressure,
    temperature,
    max,
    min,
    country,
    weather,
  } = props;

  return (
    <div className="infocard">
      {temperature ? (
        <div id="location">
          <h2>
            Coordinates: {lat}, {long}
          </h2>
          <h2>Country: {country}</h2>
          <div id="temperature">
            <h3>Temperature: {temperature} degrees Fahrenheit</h3>
            <h3>Highest: {max} degrees Fahrenheit</h3>
            <h3>Lowest: {min} degrees Fahrenheit</h3>
            <h3>Humidity: {humidity}%</h3>
            <h3>Feels Like: {feels} degrees Fahrenheit</h3>
            <h3>Weather: {weather.map((i) => i.main).join(", ")}</h3>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Infocard;
