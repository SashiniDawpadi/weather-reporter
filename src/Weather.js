import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        const city = "Colombo";
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
        );
        setWeather(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch weather data");
        console.error(err);
      }
    };

    fetchWeather();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!weather) {
    return <p>Loading weather data...</p>;
  }

  const { temp_c, humidity, wind_kph, uv } = weather.current;
  const { text, icon } = weather.current.condition;
  // current.feelslike_c
  // current.condition.text
  return (
    <div>
      <h2>
        Current Weather in Colombo{" "}
        <img
          src={icon}
          alt="Icon"
          style={{ width: "24px", verticalAlign: "middle" }}
        />{" "}
      </h2>

      <p>Temperature: {temp_c} °C</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {wind_kph} km/h</p>
      <p>UV Index: {uv}</p>
      <p>Condition: {text}</p>
    </div>
  );
};

export default Weather;