import "./App.css";
import HGWeather from "./components/hgweather";
import OpenWeather from "./components/openweather";

function App() {
  return (
    <main className="App">
      <HGWeather />
      <OpenWeather />
      <aside className="btn-container">
        <input className="btn btn-input" type="text" value="" />
        <button className="btn btn-consulta">Consulta</button>
        <select className="btn btn-select" id="selectlist">
          <option>Primeira opção</option>
        </select>
      </aside>
    </main>
  );
}

export default App;
