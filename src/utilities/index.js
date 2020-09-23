import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    multiplier: 200000,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    multiplier: 240000,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    multiplier: 400000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={Math.sqrt(
        country[casesType] * casesTypeColors[casesType].multiplier
      )}
    >
      <Popup className="info-container">
        <div>
          <div
            className="info-container__flag"
            style={{
              backgroundImage: `url(${country.countryInfo.flag})`,
            }}
          ></div>
          <div className="info-container__name">{country.country}</div>
          <div className="info-container__stats">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-container__stats">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-container__stats">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
