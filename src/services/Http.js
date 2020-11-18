import axios from "axios";

/**
 * Base URL to make request to disease API
 */
const Http = axios.create({
  baseURL: "https://disease.sh/v3/covid-19",
});

export default Http;
