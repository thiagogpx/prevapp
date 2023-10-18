import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

// Create a new map instance
const map = new Map({
 target: 'map', // The DOM element that will contains the map
 layers: [
    // Add a new tile layer to the map
    new TileLayer({
      source: new OSM(), // Use the OpenStreetMap source
    }),
 ],
 view: new View({
    center: [0, 0], // Coordinates of the map center (longitude, latitude)
    zoom: 2, // Zoom level of the map
 }),
});