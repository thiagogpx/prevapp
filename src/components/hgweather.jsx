import React, { useState, useEffect } from "react";
import axios from "axios";

// https://api.hgbrasil.com/weather?format=json-cors&key=185fee55&city_name={city_name}

const linkPhotoMoon = "https://assets.hgbrasil.com/weather/icons/moon";
const linkPhotoCondition =
  "https://assets.hgbrasil.com/weather/icons/conditions";

const moonPhaseIcons = {
  new: linkPhotoMoon + "/new.png",
  waxing_crescent: linkPhotoMoon + "/waxing_crescent.png",
  first_quarter: linkPhotoMoon + "/first_quarter.png",
  waxing_gibbous: linkPhotoMoon + "/waxing_gibbous.png",
  full: linkPhotoMoon + "/full.png",
  waning_gibbous: linkPhotoMoon + "/waning_gibbous.png",
  last_quarter: linkPhotoMoon + "/last_quarter.png",
  waning_crescent: linkPhotoMoon + "/waning_crescent.png",
};

const conditionIcons = {
  storm: linkPhotoCondition + "/storm.svg",
  snow: linkPhotoCondition + "/snow.svg",
  hail: linkPhotoCondition + "/hail.svg",
  rain: linkPhotoCondition + "/rain.svg",
  fog: linkPhotoCondition + "/fog.svg",
  clear_day: linkPhotoCondition + "/clear_day.svg",
  clear_night: linkPhotoCondition + "/clear_night.svg",
  cloud: linkPhotoCondition + "/cloud.svg",
  cloudly_day: linkPhotoCondition + "/cloudly_day.svg",
  cloudly_night: linkPhotoCondition + "/cloudly_night.svg",
  none_day: linkPhotoCondition + "/none_day.svg",
  none_night: linkPhotoCondition + "/none_night.svg",
};

const moonPhaseNames = {
  new: "Lua nova",
  waxing_crescent: "Lua crescente",
  first_quarter: "Quarto crescente",
  waxing_gibbous: "Gibosa crescente",
  full: "Lua cheia",
  waning_gibbous: "Gibosa minguante",
  last_quarter: "Quarto minguante",
  waning_crescent: "Lua minguante",
};

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

  return (
    <div>
      <h2>Informações climáticas</h2>
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
        {HGWeather && HGWeather.results && HGWeather.results.moon_phase
          ? moonPhaseNames[HGWeather.results.moon_phase]
          : "Desconhecida"}
      </p>
      <p>
        <img
          src={
            moonPhaseIcons[
              HGWeather && HGWeather.results && HGWeather.results.moon_phase
            ]
          }
        />
      </p>
      <p>
        <img
          src={
            conditionIcons[
              HGWeather && HGWeather.results && HGWeather.results.condition_slug
            ]
          }
        />
      </p>
    </div>
  );
};

export default HGWeather;
