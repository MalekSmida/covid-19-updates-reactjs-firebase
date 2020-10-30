import React from "react";

// Node modules
import { Map as LeafletMap, TileLayer } from "react-leaflet";

// Local files
import "./Map.scss";
import { showDataOnMap } from "../../utilities";

/**
 * Map that displays countries covid-19 statistics
 *
 * @param {Object} countries => contains countries data
 * @param {String} casesType => could be: cases, recovered or deaths
 * @param {Object} center => { lat, lng }
 * @param {Number} zoom => zooming number
 */
function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
