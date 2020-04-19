// import React from "react";
// import logo from "./logo.svg";
import React, { Component } from "react";
import styles from "./App.module.css";
import { fetchdata } from "./api";
import coronaimage from "./images/image.png";
// import Cards from "./components/cards";
import { Cardsmatrics, Charts, Counts } from "./components";
import { StylesProvider } from "@material-ui/core";
class App extends Component {
  state = {
    data: {},
    country: "",
  };
  async componentDidMount() {
    const fetchData = await fetchdata();
    this.setState({ data: fetchData });
  }
  handleCountryChange = async (country) => {
    //fetch data
    const fetchData = await fetchdata(country);
    // console.log(fetchData);
    //setstate
    this.setState({ data: fetchData, country: country });
  };
  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaimage} />
        <Cardsmatrics data={data} />
        <Counts handleCountryChange={this.handleCountryChange} />
        <Charts data={data} country={country} />
      </div>
    );
  }
}

export default App;
