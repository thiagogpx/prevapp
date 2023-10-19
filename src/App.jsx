import React, { useState, useEffect } from "react";
import "./App.css";
import HGWeather from "./components/hgweather";
import OpenWeather from "./components/openweather";
import PrevHGWeather from "./components/prevhgweather";

function App() {
  const storedCityName = localStorage.getItem("cityName") || "";
  const storedSelectOptions =
    JSON.parse(localStorage.getItem("selectOptions")) || [];
  const [cityName, setCityName] = useState(storedCityName);
  const [selectOptions, setSelectOptions] = useState(storedSelectOptions);
  const [selectedOption, setSelectedOption] = useState("");
  const [mapCoordinates, setMapCoordinates] = useState(null);
  const [showPopInf, setshowPopInf] = useState(false);
  const [showPopPrev, setshowPopPrev] = useState(false);

  const openPopup = () => {
    setshowPopInf(true);
  };

  const openPopupPrev = () => {
    setshowPopPrev(true);
  };

  const handleConsult = async (city) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=77196afc0576402a1dea3159a2f2385f`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setMapCoordinates({ lat, lon });
      }
      if (!selectOptions.includes(city)) {
        setSelectOptions((options) => [...options, city]);
      }
      setCityName(city);
    } catch (error) {
      console.error("Erro ao consultar a API do OpenWeather:", error);
    }
  };

  const handleSelectChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedOption(selectedCity);
  };

  useEffect(() => {
    if (selectedOption) {
      handleConsult(selectedOption);
    }
  }, [selectedOption]);

  // Armazene os dados no Local Storage sempre que houver uma alteração
  useEffect(() => {
    localStorage.setItem("cityName", cityName);
    localStorage.setItem("selectOptions", JSON.stringify(selectOptions));
  }, [cityName, selectOptions]);

  return (
    <main className="App">
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
        <button className="btn btn-open-popup" onClick={openPopup}>
          Informações climáticas
        </button>
        <button className="btn btn-prev-temp" onClick={openPopupPrev}>
          Previsões climáticas
        </button>
      </aside>
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
      <div className="map-control">
        <OpenWeather cityName={cityName} mapCoordinates={mapCoordinates} />
      </div>
    </main>
  );
}

export default App;
