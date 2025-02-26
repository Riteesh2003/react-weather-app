// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   InputAdornment,
//   CircularProgress,
//   useMediaQuery,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import MyLocationIcon from "@mui/icons-material/MyLocation";

// const Header = ({ onSearch }) => {
//   const [city, setCity] = useState("");
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const isMobile = useMediaQuery("(max-width:600px)"); // Check for mobile screens

//   const handleSearch = () => {
//     if (!city.trim()) {
//       alert("Please enter a city name");
//       return;
//     }
//     onSearch(city);
//   };

//   const fetchLocation = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser");
//       return;
//     }

//     setLoadingLocation(true);

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;

//         try {
//           const response = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//           );
//           const data = await response.json();

//           const cityName =
//             data.address.city ||
//             data.address.town ||
//             data.address.village ||
//             data.address.municipality ||
//             data.address.state_district ||
//             data.address.state;

//           if (cityName) {
//             setCity(cityName);
//             onSearch(cityName);
//           } else {
//             alert("Could not determine city name. Please enter manually.");
//           }
//         } catch (error) {
//           alert("Error fetching location details. Try again later.");
//         } finally {
//           setLoadingLocation(false);
//         }
//       },
//       () => {
//         alert("Unable to retrieve your location");
//         setLoadingLocation(false);
//       }
//     );
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexWrap: "wrap",
//         gap: "10px",
//         alignItems: "center",
//         justifyContent: "center",
//         width: "100%",
//         padding: "10px",
//       }}
//     >
//       <TextField
//         variant="outlined"
//         size="small"
//         placeholder="Search City"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon color="action" />
//             </InputAdornment>
//           ),
//           sx: {
//             borderRadius: "30px",
//             backgroundColor: "#f0f0f0",
//             "& fieldset": { border: "none" },
//           },
//         }}
//         sx={{
//           width: isMobile ? "100%" : "350px", // Full width on mobile, fixed width on larger screens
//         }}
//       />
//       <Button
//         variant="contained"
//         onClick={handleSearch}
//         sx={{
//           textTransform: "none",
//           px: 3,
//           borderRadius: "30px",
//           background: "linear-gradient(to right, #00c6ff, #0072ff)",
//           color: "white",
//           "&:hover": {
//             background: "linear-gradient(to right, #0099e5, #0066cc)",
//           },
//           width: isMobile ? "100%" : "auto",
//         }}
//       >
//         Get Weather
//       </Button>
//       <Button
//         variant="contained"
//         onClick={fetchLocation}
//         disabled={loadingLocation}
//         sx={{
//           textTransform: "none",
//           px: 3,
//           borderRadius: "30px",
//           background: "linear-gradient(to right, #ff9800, #ff5722)",
//           color: "white",
//           "&:hover": {
//             background: "linear-gradient(to right, #e68900, #e64a19)",
//           },
//           width: isMobile ? "100%" : "auto",
//         }}
//         startIcon={
//           loadingLocation ? (
//             <CircularProgress size={20} color="inherit" />
//           ) : (
//             <MyLocationIcon />
//           )
//         }
//       >
//         Use Current Location
//       </Button>
//     </div>
//   );
// };

// export default Header;

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
    <div className="header-container">
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
        className="search-field"
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        className="weather-button"
      >
        Get Weather
      </Button>
      <Button
        variant="contained"
        onClick={fetchLocation}
        disabled={loadingLocation}
        className="location-button"
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

      {/* Responsive Styles */}
      <style>
        {`
          .header-container {
            display: flex;
            gap: 10px;
            align-items: center;
            width: 100%;
            flex-wrap: wrap;
            justify-content: center;
          }

          .search-field {
            min-width: 550px;
          }

          .weather-button, .location-button {
            text-transform: none;
            px: 3;
            border-radius: 30px;
            color: white;
          }

          .weather-button {
            background: linear-gradient(to right, #00c6ff, #0072ff);
          }

          .weather-button:hover {
            background: linear-gradient(to right, #0099e5, #0066cc);
          }

          .location-button {
            background: linear-gradient(to right, #ff9800, #ff5722);
          }

          .location-button:hover {
            background: linear-gradient(to right, #e68900, #e64a19);
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .header-container {
              flex-direction: column;
              align-items: stretch;
              gap: 10px;
            }

            .search-field {
              min-width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Header;
