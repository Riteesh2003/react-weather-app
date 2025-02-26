import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

const WeatherAPI = () => {
  const [weather, setWeather] = useState(null);
  const [forecast5Day, setForecast5Day] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [city, setCity] = useState("");
  const [time, setTime] = useState("");

  const API_KEY = "6KGj7OQQnbay7gKjT94t4QoeU9MzFK8K"; // Replace with your API key

  // Function to format UTC time to Local Time (IST)
  const formatTime = (utcTime) => {
    if (!utcTime) return "NA";
    return new Date(utcTime).toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const fetchWeather = async (searchCity) => {
    setCity(searchCity);
    try {
      const response = await axios.get(
        `https://api.tomorrow.io/v4/weather/forecast?location=${searchCity}&apikey=${API_KEY}`
      );

      const currentTime = response.data.timelines.minutely[0]?.time;
      setTime(currentTime);

      const minutelyData = response.data.timelines?.minutely?.[0]?.values;
      const dailyData = response.data.timelines?.daily?.[0]?.values; // Get daily values

      console.log("API Response:", response.data);
      console.log("Daily Data:", response.data.timelines.daily[0]);

      // Convert sunrise and sunset times to local time (IST)
      const sunriseTime = formatTime(dailyData?.sunriseTime);
      const sunsetTime = formatTime(dailyData?.sunsetTime);

      setWeather({
        temperature: minutelyData?.temperature,
        windSpeed: minutelyData?.windSpeed,
        humidity: minutelyData?.humidity,
        hailProbability: minutelyData?.hailProbability,
        pressure: minutelyData?.pressureSeaLevel,
        sunriseTime: sunriseTime, // Store formatted sunrise time
        sunsetTime: sunsetTime, // Store formatted sunset time
      });

      setForecast5Day(response.data.timelines.daily.slice(0, 5));
      setHourlyData(response.data.timelines.hourly.slice(0, 12));
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Could not fetch weather. Check API key or city name.");
    }
  };

  return (
    <div>
      <Layout
        city={city}
        time={time}
        weather={weather}
        forecast5Day={forecast5Day}
        hourlyData={hourlyData}
        onSearch={fetchWeather}
      />
    </div>
  );
};

export default WeatherAPI;
