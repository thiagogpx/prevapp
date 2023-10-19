import React, { useState, useEffect } from "react";
import "./App.css";
import HGWeather from "./components/hgweather";
import OpenWeather from "./components/openweather";
import PrevHGWeather from "./components/prevhgweather";

function App() {
  // Recupera o nome da cidade armazenado no Local Storage, ou usa uma string vazia se não estiver disponível.
  const storedCityName = localStorage.getItem("cityName") || "";

  // Recupera as opções selecionadas armazenadas no Local Storage, ou usa um array vazio se não estiver disponível.
  const storedSelectOptions = JSON.parse(localStorage.getItem("selectOptions")) || [];

  // Define estados para o nome da cidade, opções selecionadas, cidade selecionada, coordenadas do mapa e flags para exibir popups.
  const [cityName, setCityName] = useState(storedCityName);
  const [selectOptions, setSelectOptions] = useState(storedSelectOptions);
  const [selectedOption, setSelectedOption] = useState("");
  const [mapCoordinates, setMapCoordinates] = useState(null);
  const [showPopInf, setshowPopInf] = useState(false);
  const [showPopPrev, setshowPopPrev] = useState(false);

  // Função para abrir o popup de informações climáticas.
  const openPopup = () => {
    setshowPopInf(true);
  };

  // Função para abrir o popup de previsões climáticas.
  const openPopupPrev = () => {
    setshowPopPrev(true);
  };

  // Função para consultar dados climáticos com base na cidade.
  const handleConsult = async (city) => {
    try {
      // Faz uma solicitação para a API do OpenWeather com base na cidade especificada.
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=77196afc0576402a1dea3159a2f2385f`
      );

      // Converte a resposta para JSON.
      const data = await response.json();

      // Se houver dados válidos, extrai as coordenadas de latitude e longitude.
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setMapCoordinates({ lat, lon });
      }

      // Se a cidade não estiver nas opções selecionadas, adiciona-a à lista.
      if (!selectOptions.includes(city)) {
        setSelectOptions((options) => [...options, city]);
      }

      // Define a cidade atual como a cidade consultada.
      setCityName(city);
    } catch (error) {
      console.error("Erro ao consultar a API do OpenWeather:", error);
    }
  };

  // Manipulador de evento para selecionar uma opção do menu suspenso.
  const handleSelectChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedOption(selectedCity);
  };

  // Efeito colateral que dispara quando uma opção é selecionada no menu suspenso.
  useEffect(() => {
    if (selectedOption) {
      handleConsult(selectedOption);
    }
  }, [selectedOption]);

  // Efeito colateral que armazena os dados no Local Storage sempre que houver uma alteração no nome da cidade ou nas opções selecionadas.
  useEffect(() => {
    localStorage.setItem("cityName", cityName);
    localStorage.setItem("selectOptions", JSON.stringify(selectOptions));
  }, [cityName, selectOptions]);

  return (
    <main className="App">
      {/* Componente para entrada de texto e botão de consulta */}
      <aside className="btn-container">
        <input
          id="inputCity"
          className="btn btn-input"
          placeholder="Digite o nome da cidade:"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button
          className="btn btn-consulta"
          onClick={() => handleConsult(cityName)}
        >
          Consulta
        </button>

        {/* Menu suspenso para seleção de cidades já consultadas */}
        <select
          className="btn btn-select"
          id="selectlist"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="">Selecione uma opção</option>
          {selectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Botões para abrir popups de informações climáticas e previsões climáticas */}
        <button className="btn btn-open-popup" onClick={openPopup}>
          Informações climáticas
        </button>
        <button className="btn btn-prev-temp" onClick={openPopupPrev}>
          Previsões climáticas
        </button>
      </aside>

      {/* Popup de informações climáticas */}
      {showPopInf && (
        <div className="popup">
          <div className="popup-content">
            <HGWeather cityName={cityName} />
            <div className="popup-footer">
              <button
                className="btn btn-close-popup"
                onClick={() => setshowPopInf(false)}
              >
                Fechar Popup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup de previsões climáticas */}
      {showPopPrev && (
        <div className="popup">
          <div className="popup-content">
            <PrevHGWeather cityName={cityName} />
            <div className="popup-footer">
              <button
                className="btn btn-close-popup"
                onClick={() => setshowPopPrev(false)}
              >
                Fechar Popup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Componente de controle do mapa e informações climáticas atuais */}
      <div className="map-control">
        <OpenWeather cityName={cityName} mapCoordinates={mapCoordinates} />
      </div>
    </main>
  );
}

export default App;
