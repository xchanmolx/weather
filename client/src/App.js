import React, { Component } from 'react';

import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Col,
  Jumbotron,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  FormGroup
} from 'reactstrap';

import Weather from './Weather';

class App extends Component {
  state = {
    weather: null,
    cityList: [],
    newCityName: ''
  };

  getCityList = () => {
    fetch('/api/cities')
    .then(res => res.json())
    .then(res => {
      var cityList = res.map(r => r.city_name);
      this.setState({ cityList });
    });
  };

  handleInputChange = (e) => {
    this.setState({ newCityName: e.target.value });
  };

  handleAddCity = () => {
    fetch('/api/cities', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ city: this.state.newCityName })
    })
    .then(res => res.json())
    .then(res => {
      this.getCityList();
      this.setState({ newCityName: '' });
    });
  };

  getWeather = (city) => {
    fetch(`/api/weather/${city}`)
    .then(res => res.json())
    .then(weather => {
      this.setState({ weather });
    });
  };

  handleChangeCity = (e) => {
    this.getWeather(e.target.value);
  };

  componentDidMount() {
    this.getCityList();
  };

  render() {
    return (
      <Container fluid className="centered">
        <Navbar dark color="dark">
          <NavbarBrand href="/">ABTIK Weather Center</NavbarBrand>
        </Navbar>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-3">ABTIK Weather Center</h1>
              <p className="lead">The current weather for your favorite municipalities or cities!</p>
              <InputGroup>
                <Input 
                  placeholder="New municipality name or city name, e.g. Aloguinsan"
                  value={this.state.newCityName}
                  onChange={this.handleInputChange}
                />
                <InputGroupAddon addonType="append">
                  <Button color="primary" onClick={this.handleAddCity}>Add City</Button>
                </InputGroupAddon>                
              </InputGroup>
            </Jumbotron>            
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="display-5">Current Weather</h1>
            <FormGroup>
              <Input type="select" onChange={this.handleChangeCity}>
                { this.state.cityList.length === 0 && <option>No municipalities or cities added yet.</option> }
                { this.state.cityList.length > 0 && <option>Select a municipality or city.</option> }
                { this.state.cityList.map((city, i) => <option key={i}>{city}</option>) }
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Weather data={this.state.weather} />
      </Container>
    );
  }
}

export default App;
