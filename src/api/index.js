import axios from "axios";
const url = "https://covid19.mathdro.id/api";

export const fetchdata = async (country) => {
  let changeableurl = url;
  if (country) {
    changeableurl = `${url}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableurl);
    const modifedData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
    // console.log(modifedData);
    return modifedData;
  } catch (error) {
    console.log(error);
  }
};
export const fetchdatadaily = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifieddata = data.map((dailydata) => ({
      confirmed: dailydata.confirmed.total,
      deaths: dailydata.deaths.total,
      date: dailydata.reportDate,
    }));
    return modifieddata;
  } catch (error) {
    console.log(error);
  }
};
export const fetchcountrydata = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((countrydata) => countrydata.name);
  } catch (error) {
    console.log(error);
  }
};
