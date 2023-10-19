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
const PrevHGWeather = ({ cityName }) => {
  const API_URL = `https://api.hgbrasil.com/weather?format=json-cors&key=179a44c8&city_name=${cityName}`;

  const [PrevHGWeather, setPrevHGWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        setPrevHGWeather(response.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [cityName]);

  return (
    <div>
      {/* o Data da previsão;
      o Temperaturas;
      ▪ Máxima;
      ▪ Mínima;
      o Tipo do clima previsto + ícone correspondente
      o Chance de chuva */}
      <h2>Previsões climáticas</h2>
      <h3>
        {" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[1].weekday}
      </h3>
      <p>
        Data:{" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[1].date}
      </p>
      <p>
        Temperatura Máxima:{" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[1].max}
        °C
      </p>
      <p>
        Temperatura Miníma:{" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[1].min}
        °C
      </p>
      <p>
        Clima previsto:{" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[1].description}
      </p>
      <p>
        Probabilidade de chuva:{" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[1].rain}
        %
      </p>
      <p>
        <img
          src={
            conditionIcons[
              PrevHGWeather &&
                PrevHGWeather.results &&
                PrevHGWeather.results.forecast[1].condition
            ]
          }
        />
      </p>
      {/* <h3>
        {" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[2].weekday}
      </h3>
      <p>
        Data:{" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[2].date}
      </p>
      <p>
        Temperatura Máxima:{" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[2].max}
        °C
      </p>
      <p>
        Temperatura Miníma:{" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[2].min}
        °C
      </p>
      <p>
        Clima previsto:{" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[2].description}
      </p>
      <p>
        Probabilidade de chuva:{" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[2].rain}
        %
      </p>
      <p>
        <img
          src={
            conditionIcons[
              PrevHGWeather &&
                PrevHGWeather.results &&
                PrevHGWeather.results.forecast[2].condition
            ]
          }
        />
      </p>
      <h3>
        {" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[3].weekday}
      </h3>
      <p>
        Data:{" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[3].date}
      </p>
      <p>
        Temperatura Máxima:{" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[3].max}
        °C
      </p>
      <p>
        Temperatura Miníma:{" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[3].min}
        °C
      </p>
      <p>
        Clima previsto:{" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[3].description}
      </p>
      <p>
        Probabilidade de chuva:{" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[3].rain}
        %
      </p>
      <p>
        <img
          src={
            conditionIcons[
              PrevHGWeather &&
                PrevHGWeather.results &&
                PrevHGWeather.results.forecast[3].condition
            ]
          }
        />
      </p> */}
    </div>
  );
};

export default PrevHGWeather;
