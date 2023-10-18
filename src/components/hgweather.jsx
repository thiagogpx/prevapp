import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// https://api.hgbrasil.com/weather?format=json-cors&key=185fee55&city_name={city_name}

const API_URL =
  "https://api.hgbrasil.com/weather?format=json-cors&key=185fee55&city_name=Curitiba";


const HGWeather = () => {
  const [HGWeather, setHGWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        setHGWeather(response.data);
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
      <h2>HGWeather</h2>
      <p>City: {HGWeather && HGWeather.results && HGWeather.results.city}</p>
      <p>Data: {HGWeather && HGWeather.results && HGWeather.results.date}</p>
      <p>
        Temperature: {HGWeather && HGWeather.results && HGWeather.results.temp}
        °C
      </p>
      <p>
        Description:{" "}
        {HGWeather && HGWeather.results && HGWeather.results.description}
      </p>
      <p>
        Tipo do clima atual + ícone correspondente:{" "}
        {HGWeather && HGWeather.results && HGWeather.results.condition_slug}
      </p>
      <p>
        Probabilidade de chuva:{" "}
        {HGWeather && HGWeather.results && HGWeather.results.rain}%
      </p>
    </div>
  );
};

HGWeather.propTypes = {
  HGWeather: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool,
};

export default HGWeather;
