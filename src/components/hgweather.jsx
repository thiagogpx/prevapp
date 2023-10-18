import React, { useState, useEffect } from "react";
import axios from "axios";

// https://api.hgbrasil.com/weather?format=json-cors&key=185fee55&city_name={city_name}

// Passar o cityName como parâmetro
const HGWeather = ({ cityName }) => {
  const API_URL = `https://api.hgbrasil.com/weather?format=json-cors&key=179a44c8&city_name=${cityName}`;

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
  }, [cityName]);

  // if (loading) return <div>Loading...</div>;

  // if (error) {
  //   if (error.response) {
  //     return <div>Error: {error.response.data.message}</div>;
  //   } else if (error.request) {
  //     return <div>Error: Network request failed</div>;
  //   } else {
  //     return <div>Error: {error.message}</div>;
  //   }
  // }
  // console.log(HGWeather)

  return (
    <div>
      <h2>HGWeather</h2>
      <p>Cidade: {HGWeather && HGWeather.results && HGWeather.results.city}</p>
      <p>Data: {HGWeather && HGWeather.results && HGWeather.results.date}</p>
      <p>
        Temperatura Atual:{" "}
        {HGWeather && HGWeather.results && HGWeather.results.temp}
        °C
      </p>
      <p>
        Temperatura Máxima:{" "}
        {HGWeather && HGWeather.results && HGWeather.results.forecast[0].max}°C
      </p>
      <p>
        Temperatura Miníma:{" "}
        {HGWeather && HGWeather.results && HGWeather.results.forecast[0].min}°C
      </p>
      <p>
        Clima atual:{" "}
        {HGWeather && HGWeather.results && HGWeather.results.description}
      </p>
      <p>
        Probabilidade de chuva:{" "}
        {HGWeather && HGWeather.results && HGWeather.results.rain}%
      </p>
      <p>
        Fase da Lua:{" "}
        {HGWeather && HGWeather.results && HGWeather.results.moon_phase}%
      </p>
    </div>
  );
};

export default HGWeather;
