import React from "react";
import CityInfo from "./CityInfo";
import WeatherDetails from "./WeatherDetails";
import Forecast5Day from "./Forecast5Day";
import ForecastHourly from "./ForecastHourly";
import Header from "./Header";

const Layout = ({
  city,
  time,
  weather,
  forecast5Day,
  hourlyData,
  onSearch,
}) => {
  return (
    <>
      <style>
        {`
    @keyframes skyAnimation {
      0% { background: linear-gradient(to bottom, #4A90E2, #A1C4FD); }
    }

    .weather-app {
      background: linear-gradient(to bottom, #4A90E2, #A1C4FD);
      animation: skyAnimation 10s ease-in-out infinite alternate;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      transition: background 0.5s ease-in-out;
      padding-top: 20px;
    }

    .header-container {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 10px;
      border-radius: 10px;
      margin-bottom: 20px;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 80%;
      max-width: 1200px;
    }

    .row {
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }

    .row > div {
      flex: 1;
      padding: 15px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.3);
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }


    .empty-message {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            color: #ffffff;
            background: rgba(0, 0, 0, 0.3);
            padding: 20px;
            border-radius: 10px;
          }

    /* Add the updated styles inside the existing media query */
    @media (max-width: 768px) {
      .row {
        flex-direction: column;
      }

      .header-container {
        width: 100%;
        padding: 0 15px; /* Ensures no overflow */
        box-sizing: border-box;
      }
    }
  `}
      </style>

      <div className="weather-app">
        <div className="header-container">
          <Header onSearch={onSearch} />
        </div>

        <div className="content">
          {weather ? (
            <>
              {/* First Row: City Info & Weather Details */}
              <div className="row">
                <CityInfo city={city} time={time} />
                <WeatherDetails weather={weather} />
              </div>

              {/* Second Row: Hourly Forecast & 5-Day Forecast */}
              <div className="row">
                <ForecastHourly hourlyData={hourlyData} />
                <Forecast5Day forecast={forecast5Day} />
              </div>
            </>
          ) : (
            <div className="empty-message">
              <p>
                🌤️ Enter a city name or use your current location to see the
                weather details. 🌎
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Layout;
