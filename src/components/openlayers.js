import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { useGeographic } from "ol/proj.js";
import { fromLonLat } from "ol/proj";



const centerCoordinates = fromLonLat([-45.360260, -23.807014]);

// Create a new map instance
const map = new Map({
  target: "map", // The DOM element that will contains the map
  layers: [
    // Add a new tile layer to the map
    new TileLayer({
      source: new OSM(), // Use the OpenStreetMap source
    }),
  ],
  view: new View({
    //  center: ol.proj.fromLonLat([126.97, 37.56]), // Coordinates of the map center (longitude, latitude)
    center: centerCoordinates, // Coordinates of the map center (longitude, latitude)
    zoom: 12, // Zoom level of the map
  }),
});
