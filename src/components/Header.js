import React, { useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const Header = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleSearch = () => {
    if (!city.trim()) {
      alert("Please enter a city name");
      return;
    }
    onSearch(city);
  };

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();

          // Improved city retrieval
          const cityName =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.municipality ||
            data.address.state_district ||
            data.address.state;

          if (cityName) {
            setCity(cityName);
            onSearch(cityName);
          } else {
            alert("Could not determine city name. Please enter manually.");
          }
        } catch (error) {
          alert("Error fetching location details. Try again later.");
        } finally {
          setLoadingLocation(false);
        }
      },
      () => {
        alert("Unable to retrieve your location");
        setLoadingLocation(false);
      }
    );
  };

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          sx: {
            borderRadius: "30px",
            backgroundColor: "#f0f0f0",
            "& fieldset": { border: "none" },
          },
        }}
        sx={{ minWidth: 550 }}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{
          textTransform: "none",
          px: 3,
          borderRadius: "30px",
          background: "linear-gradient(to right, #00c6ff, #0072ff)",
          color: "white",
          "&:hover": {
            background: "linear-gradient(to right, #0099e5, #0066cc)",
          },
        }}
      >
        Get Weather
      </Button>
      <Button
        variant="contained"
        onClick={fetchLocation}
        disabled={loadingLocation}
        sx={{
          textTransform: "none",
          px: 3,
          borderRadius: "30px",
          background: "linear-gradient(to right, #ff9800, #ff5722)",
          color: "white",
          "&:hover": {
            background: "linear-gradient(to right, #e68900, #e64a19)",
          },
        }}
        startIcon={
          loadingLocation ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <MyLocationIcon />
          )
        }
      >
        Use Current Location
      </Button>
    </div>
  );
};

export default Header;
