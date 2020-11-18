import React, { useState, useEffect } from "react";

// node modules
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";

// local files
import { Graph, InfoBox, Map, Table } from "./components";
import { sortData, prettyPrintStat } from "./utilities";
import {
  getCovidAllData,
  getCountriesData,
  getCountryData,
} from "./services/Covid";
import "./App.scss";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746,
    lng: -40.4796,
  });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [error, setError] = useState({});

  // fetch covid-19 data from disease
  useEffect(() => {
    let ignore = false;

    (async function () {
      const res = await getCovidAllData();
      if (ignore) return;
      if (res.error) {
        setError(res.error);
        return;
      }
      setCountryInfo(res.response.data);
    })();

    return () => {
      ignore = true;
    };
  }, []);

  // fetch covid-19 countries data from disease
  useEffect(() => {
    let ignore = false;

    (async function () {
      const res = await getCountriesData();
      if (ignore) return;
      if (res.error) {
        setError(res.error);
        return;
      }
      const data = res.response.data;
      const countries = data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      const sortedData = sortData(data);
      setTableData(sortedData);
      setCountries(countries);
      setMapCountries(data);
    })();

    return () => {
      ignore = true;
    };
  }, []);

  // handle changing country
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    (async function () {
      const res =
        countryCode === "worldwide"
          ? await getCountriesData() // TODO: fix
          : await getCountryData(countryCode);
      if (res.error) {
        setError(res.error);
        return;
      }
      const data = res.response.data;
      setCountry(countryCode);
      setCountryInfo(data);
      if (countryCode !== "worldwide") {
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      } else {
        setMapCenter([34.80746, -40.4796]);
        setMapZoom(3);
      }
    })();
  };
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__left__header">
          <h1>Covid 19 Updates</h1>
          <FormControl className="app__left__header__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem key={0} value="worldwide">
                Worldwide
              </MenuItem>
              {countries.map((country, index) => (
                <MenuItem key={index + 1} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__left__stats">
          <InfoBox
            isRed
            selected={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            selected={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            isRed
            selected={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>

        <Map
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3 className="app__right__title">
            {country} new {casesType}
          </h3>
          <Graph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
