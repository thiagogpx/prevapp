import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// http://api.openweathermap.org/geo/1.0/direct?q={city_name}&limit=1&appid=77196afc0576402a1dea3159a2f2385f

const API_URL =
  "http://api.openweathermap.org/geo/1.0/direct?q=Curitiba&limit=1&appid=77196afc0576402a1dea3159a2f2385f";

const OpenWeather = () => {
  const [OpenWeather, setOpenWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        setOpenWeather(response.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) {
    if (error.response) {
      return <div>Error: {error.response.data.message}</div>;
    } else if (error.request) {
      return <div>Error: Network request failed</div>;
    } else {
      return <div>Error: {error.message}</div>;
    }
  }

  return (
    <div>
    </div>
  );
};

OpenWeather.propTypes = {
  OpenWeather: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool,
};

export default OpenWeather;
