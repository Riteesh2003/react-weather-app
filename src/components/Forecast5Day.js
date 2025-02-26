import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import AcUnitIcon from "@mui/icons-material/AcUnit";

const getWeatherDetails = (temperature) => {
  if (temperature > 30) {
    return {
      icon: <WhatshotIcon fontSize="large" sx={{ color: "red" }} />,
      name: "Heatwave",
    };
  } else if (temperature >= 25 && temperature <= 30) {
    return {
      icon: <WbSunnyIcon fontSize="large" sx={{ color: "orange" }} />,
      name: "Sunny",
    };
  } else if (temperature >= 15 && temperature < 25) {
    return {
      icon: <Typography fontSize="2rem">⛅</Typography>,
      name: "Partly Cloudy",
    };
  } else if (temperature >= 5 && temperature < 15) {
    return {
      icon: <CloudIcon fontSize="large" sx={{ color: "blue" }} />,
      name: "Cloudy",
    };
  } else {
    return {
      icon: <AcUnitIcon fontSize="large" sx={{ color: "#00f" }} />,
      name: "Cold",
    };
  }
};

const Forecast5Day = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return <Typography></Typography>;

  return (
    <Card
      sx={{
        maxWidth: 500,
        mx: "auto",
        my: 2,
        p: 2,
        boxShadow: 3,
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          5-Day Forecast
        </Typography>
        {forecast.map((day, index) => {
          const formattedDate = new Date(day.time)
            .toLocaleDateString("en-GB", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })
            .replace(/, \d{4}$/, "");
          const temperature = day.values?.temperatureAvg ?? "N/A";
          const { icon, name } = getWeatherDetails(temperature);

          return (
            <React.Fragment key={index}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                  {icon}
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {name}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {temperature}°C
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {formattedDate}
                  </Typography>
                </Grid>
              </Grid>
              {index !== forecast.length - 1 && <Divider sx={{ my: 1 }} />}
            </React.Fragment>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default Forecast5Day;
