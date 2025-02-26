import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const CityInfo = ({ city, time }) => {
  if (!time) return null;

  const formattedDate = new Date(time)
    .toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "short",
    })
    .replace(/, \d{4}$/, ""); // Removes the year

  const formattedTime = new Date(time).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Card
      sx={{
        maxWidth: 400,
        // height: 200, // Ensures uniform height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
        my: 2,
        p: 3,
        boxShadow: 3,
        background: "rgba(255, 255, 255, 0.2)", // Glassmorphism effect
        borderRadius: 2,
        // border: "2px solid #ddd",
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {city}
        </Typography>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {formattedTime}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {formattedDate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CityInfo;
