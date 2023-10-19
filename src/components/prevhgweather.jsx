import React, { useState, useEffect } from "react";
import axios from "axios";

// https://api.hgbrasil.com/weather?format=json-cors&key=185fee55&city_name={city_name}

// Definindo URLs de recursos para ícones de fases da lua e condições climáticas
const linkPhotoCondition =
  "https://assets.hgbrasil.com/weather/icons/conditions";

// Mapeamento de ícones para as condições climáticas
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

// O componente PrevHGWeather recebe uma prop "cityName" para indicar a cidade a ser consultada

const PrevHGWeather = ({ cityName }) => {
  // Construção da URL da API com base na cidade recebida
  const API_URL = `https://api.hgbrasil.com/weather?format=json-cors&key=179a44c8&city_name=${cityName}`;

  // Estados para armazenar os dados da previsão do tempo, erros e estado de carregamento
  const [PrevHGWeather, setPrevHGWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // UseEffect que faz a solicitação à API quando a cidade (cityName) muda
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Faz uma solicitação para a API da HG Brasil usando Axios
        const response = await axios.get(API_URL);
        // Define os dados da previsão do tempo na variável de estado
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
      <p>
        Probabilidade de chuva:{" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[1].rain}
        %
      </p>
      {/* Repete o mesmo padrão para as próximas previsões (forecast[2], forecast[3], etc.) */}
      <h3>
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
      <p>
        Probabilidade de chuva:{" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[2].rain}
        %
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
        <img
          src={
            conditionIcons[
              PrevHGWeather &&
                PrevHGWeather.results &&
                PrevHGWeather.results.forecast[3].condition
            ]
          }
        />
      </p>
      <p>
        Probabilidade de chuva:{" "}
        {PrevHGWeather &&
          PrevHGWeather.results &&
          PrevHGWeather.results.forecast[3].rain}
        %
      </p>
    </div>
  );
};

export default PrevHGWeather;
