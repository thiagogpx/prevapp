import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

const OpenWeather = ({ cityName, mapCoordinates }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Se o mapa ainda não foi criado, crie uma nova instância com centro inicial
      const initialCenter = mapCoordinates
        ? fromLonLat([mapCoordinates.lon, mapCoordinates.lat])
        : [0, 0]; // Defina o centro como [0, 0] se as coordenadas não estiverem disponíveis
      const initialZoom = mapCoordinates ? 12 : 2; // Defina o zoom inicial com base na disponibilidade das coordenadas
      const map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: initialCenter,
          zoom: initialZoom,
        }),
      });

      mapRef.current = map;
    } else if (mapCoordinates) {
      // Se o mapa já foi criado e as coordenadas estão disponíveis, atualize o centro e o zoom
      const centerCoordinates = fromLonLat([
        mapCoordinates.lon,
        mapCoordinates.lat,
      ]);
      mapRef.current.getView().setCenter(centerCoordinates);
      mapRef.current.getView().setZoom(12); // Defina o zoom para 16 se as coordenadas estiverem disponíveis
    }
  }, [mapCoordinates]);

  return <div id="map" className="map"></div>;
};

export default OpenWeather;
