import { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const cities = ["Colombo", "Kandy", "Galle", "Jaffna", "Negombo", "Anuradhapura", "Batticaloa"];
  const [selectedCity, setSelectedCity] = useState("Colombo");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${selectedCity}&aqi=yes`
        );
        setWeather(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch weather data");
        console.error(err);
      }
    };
    fetchWeather();
  }, [selectedCity]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!weather) {
    return <p>Loading weather data...</p>;
  }

  const { temp_c, humidity, wind_kph, uv , wind_dir} = weather.current;
  const { text, icon } = weather.current.condition;
  const { region} = weather.location;
 
  return (
    <div className="container">
      <h1>Weather Reporter App</h1>
      <div className="weather-info">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <h2>Current weather for {selectedCity} : {region}</h2>
        <h3>
          <span>{text}</span>
          <img
            src={icon}
            alt="Icon"
            style={{ width: "30px", marginLeft: "8px" }}
          />
        </h3>
        <p>Temperature: {temp_c} °C</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind Speed: {wind_kph} km/h to {wind_dir}</p>
        <p>UV Index: {uv}</p>
      </div>
    </div>
  );
};

export default Weather;