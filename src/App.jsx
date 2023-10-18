import React, { useState, useEffect } from "react";
import "./App.css";
import HGWeather from "./components/hgweather";
import OpenWeather from "./components/openweather";

function App() {
  const [cityName, setCityName] = useState("");
  const [mapCoordinates, setMapCoordinates] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const handleConsult = async () => {
    const inputCity = document.getElementById("inputCity");
    setCityName(inputCity.value);

    // Consulte a API do OpenWeather para obter as coordenadas da cidade
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=77196afc0576402a1dea3159a2f2385f`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setMapCoordinates({ lat, lon });
      }
    } catch (error) {
      console.error("Erro ao consultar a API do OpenWeather:", error);
    }
  };

  return (
    <main className="App">
      {/* <HGWeather cityName={cityName} />
      <OpenWeather cityName={cityName} mapCoordinates={mapCoordinates} /> */}
      <aside className="btn-container">
        <input
          id="inputCity"
          className="btn btn-input"
          placeholder="Digite o nome da cidade:"
        />
        <button className="btn btn-consulta" onClick={handleConsult}>
          Consulta
        </button>
        <select className="btn btn-select" id="selectlist">
          <option>Primeira opção</option>
        </select>
        <button className="btn btn-open-popup" onClick={openPopup}>
          Abrir Popup
        </button>
      </aside>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <HGWeather cityName={cityName} />
            <button
              className="btn btn-close-popup"
              onClick={() => setShowPopup(false)}
            >
              Fechar Popup
            </button>
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
