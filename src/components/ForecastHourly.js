import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import NearMeIcon from "@mui/icons-material/NearMe"; // Wind direction icon

// Function to determine icon & weather name based on temperature
const getWeatherDetails = (temperature) => {
  if (temperature > 30) {
    return {
      icon: <WhatshotIcon sx={{ color: "red", fontSize: 60 }} />,
      name: "Heatwave",
    };
  } else if (temperature >= 25) {
    return {
      icon: <WbSunnyIcon sx={{ color: "orange", fontSize: 60 }} />,
      name: "Sunny",
    };
  } else if (temperature >= 15) {
    return {
      icon: <CloudIcon sx={{ color: "blue", fontSize: 60 }} />,
      name: "Cloudy",
    };
  } else {
    return {
      icon: <AcUnitIcon sx={{ color: "#00f", fontSize: 60 }} />,
      name: "Cold",
    };
  }
};

// Function to rotate wind icon based on direction (0° = North, 90° = East)
const getWindIcon = (direction) => (
  <NearMeIcon
    sx={{
      transform: `rotate(${direction}deg)`,
      fontSize: 40,
      color: "#1976d2",
    }}
  />
);

const ForecastHourly = ({ hourlyData }) => {
  if (!hourlyData || hourlyData.length === 0) return <Typography></Typography>;

  // Take only the first 5 hours
  const limitedData = hourlyData.slice(0, 5);

  return (
    <Card
      sx={{
        maxWidth: 750,
        mx: "auto",
        my: 2,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,

        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <CardContent>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          Hourly Forecast
        </Typography>

        {/* Horizontal layout with dividers */}
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {limitedData.map((hour, index) => {
            const { icon } = getWeatherDetails(hour.values.temperature);
            const windSpeed = hour.values.windSpeed || 0;
            const windDirection = hour.values.windDirection || 0;

            return (
              <React.Fragment key={index}>
                {/* Weather Block */}
                <Grid item>
                  <Stack spacing={1.5} alignItems="center">
                    {/* Time */}
                    <Typography variant="h6" fontWeight="bold">
                      {new Date(hour.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>

                    {/* Weather Icon */}
                    {icon}

                    {/* Temperature */}
                    <Typography variant="h6" fontWeight="bold">
                      {hour.values.temperature}°C
                    </Typography>

                    {/* Wind Icon */}
                    {getWindIcon(windDirection)}

                    {/* Wind Speed */}
                    <Typography variant="body1" fontWeight="bold">
                      {windSpeed} km/h
                    </Typography>
                  </Stack>
                </Grid>

                {/* Divider between forecast blocks */}
                {index !== limitedData.length - 1 && (
                  <Grid item>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        height: "200px",
                        borderWidth: 1,
                        backgroundColor: "lightgray",
                      }}
                    />
                  </Grid>
                )}
              </React.Fragment>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ForecastHourly;
