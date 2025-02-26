import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import CloudIcon from "@mui/icons-material/Cloud";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import SpeedIcon from "@mui/icons-material/Speed";

// Function to determine weather icon based on temperature
const getWeatherIcon = (temperature) => {
  if (temperature > 30) {
    return (
      <WhatshotIcon fontSize="inherit" sx={{ color: "red", fontSize: 80 }} />
    );
  } else if (temperature >= 25 && temperature <= 30) {
    return (
      <WbSunnyIcon fontSize="inherit" sx={{ color: "orange", fontSize: 80 }} />
    );
  } else if (temperature >= 15 && temperature < 25) {
    return (
      <FilterDramaIcon
        fontSize="inherit"
        sx={{ color: "gray", fontSize: 80 }}
      />
    );
  } else {
    return (
      <CloudIcon fontSize="inherit" sx={{ color: "blue", fontSize: 80 }} />
    );
  }
};

const WeatherDetails = ({ weather }) => {
  if (!weather) return <Typography></Typography>;

  return (
    <Card
      sx={{
        maxWidth: 800,
        mx: "auto",
        my: 2,
        p: 2,
        boxShadow: 3,
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" align="center" gutterBottom>
          Current Weather
        </Typography>

        <Grid container spacing={2}>
          {/* Temperature & Weather Icon */}
          <Grid item xs={6}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h3" fontWeight="bold">
                {weather.temperature}°C
              </Typography>
              <Box sx={{ fontSize: 90 }}>
                {getWeatherIcon(weather.temperature)}
              </Box>
              <Typography variant="h5" fontWeight="bold">
                {weather.temperature > 30
                  ? "Heatwave"
                  : weather.temperature >= 25
                  ? "Sunny"
                  : weather.temperature >= 15
                  ? "Partly Cloudy"
                  : "Cloudy"}
              </Typography>
            </Box>
          </Grid>

          {/* Wind, Humidity, Hail, Pressure */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <AirIcon fontSize="large" />
                  <Typography variant="body2">Wind</Typography>
                  <Typography variant="body2">
                    {weather.windSpeed} m/s
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <WaterDropIcon fontSize="large" />
                  <Typography variant="body2">Humidity</Typography>
                  <Typography variant="body2">{weather.humidity}%</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <AcUnitIcon fontSize="large" />
                  <Typography variant="body2">Hail</Typography>
                  <Typography variant="body2">
                    {weather.hailProbability}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <SpeedIcon fontSize="large" />
                  <Typography variant="body2">Pressure</Typography>
                  <Typography variant="body2">
                    {weather.pressure} hPa
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
