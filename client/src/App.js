import React, { Component } from "react";
import styled from "styled-components";
import { injectGlobal } from "styled-components";
import axios from 'axios';

import Header from "./components/static-components/Header";
import Footer from "./components/static-components/Footer";

injectGlobal`
@import url('https://fonts.googleapis.com/css?family=Sarina');
@import url('https://fonts.googleapis.com/css?family=Diplomata+SC');
`;

class App extends Component {
  state = {
    cities: [],
    newCityFormOpen: false,
    newCity: {
      name: 'Atlanta',
      description: "Don't go there, it sucks!",
      photo_url: 'https://i.imgur.com/42zYDsw.jpg'
    },
    error: ''
  }

  componentDidMount() {
    this.getAllCities();
  }

  getAllCities = async () => {
    try {
      const res = await axios.get('/api/cities')
      this.setState({ cities: res.data.cities })
      console.log(this.state)
    } catch (err) {
      this.setState({ err: err.message })
    }
  }

  toggleNewCityForm() {
    this.setState({ newCityFormOpen: !this.state.newCityFormOpen })
  }

  handleChange = (event) => {
    const newCity = {...this.state.newCity}
    const att = event.target.name
    newCity [ att ] = event.target.value
  }

  createNewCity = async (event) => {
    event.preventDefault()
    const response = await axios.post('/api/cities', this.state.newCity)
    const cities = [...this.state.cities, response.data]
    this.setState({
      newCity: {
        name: '',
        description: '',
        photo_url: ''
      },
    })
  }

  render() {
    return (
      <div>
        <Header />
        <PageWrapper>
          <h1>Atlanta</h1>
          <img src="https://i.imgur.com/42zYDsw.jpg" />
          <h1>London</h1>
          <img src="https://i.imgur.com/6X26EdW.jpg" />
          <h1>San Francisco</h1>
          <img src="https://i.imgur.com/6YH983R.jpg" />
        </PageWrapper>
        <Footer />
      </div>
    );
  }
}

const PageWrapper = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url("https://i.imgur.com/mZVpFqq.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  align-items: center;

  img {
    width: 60%;
    margin: 15px;
    border-radius: 15px;
    padding: 15px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  h1 {
    font-family: 'Diplomata SC', cursive;
    color: white;
    font-size: 28px; 
    text-shadow: 1px 2px black;
    margin: 28px 0px;
  }
`;

export default App;

