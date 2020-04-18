import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./Counts.module.css";
import { fetchcountrydata } from "../../api";
const Counts = ({ handleCountryChange }) => {
  const [countrydata, setcountrydata] = useState([]);
  useEffect(() => {
    const fetchcountryapi = async () => {
      setcountrydata(await fetchcountrydata());
    };
    console.log(countrydata + "this is the data");
    fetchcountryapi();
  }, [setcountrydata]);
  return (
    <FormControl className={styles.formcontrol}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">global</option>
        {countrydata.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Counts;
