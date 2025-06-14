import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Colombo&aqi=yes`
        );
        setWeather(response.data);
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

  return (
    <div>
      <h2>Current Weather in Colombo</h2>
      <p>Temperature: {temp_c} °C</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {wind_kph} km/h</p>
      <p>UV Index: {uv}</p>
    </div>
  );
};

export default Weather;