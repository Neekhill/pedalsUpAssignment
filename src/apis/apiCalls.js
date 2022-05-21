import axios from "axios";
export function getDataFromApi(url) {
  return axios.get(url);
}
