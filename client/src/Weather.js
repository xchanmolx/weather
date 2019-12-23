import React from 'react';
import { Row, Col, Table } from 'reactstrap';

const weather = (props) => {
    const { data } = props;

    if (!data)
        return <div></div>;
    
    return (
        <Row className="weather">
            <Col sm="12" md={{size: 4, offset: 4}}>
                <h2>{data.name}</h2>
                <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="Weather Icon" />
                <span>{data.weather[0].main}</span>&nbsp;
                <span>{Math.floor(data.main.temp)}&deg;C</span><br />
                <span><strong>{data.weather[0].description}</strong></span>
                <Table>
                    <tbody>
                        <tr>
                            <td>Wind</td>
                            <td>{Math.floor(data.wind.speed)} km/h</td>
                        </tr>
                        <tr>
                            <td>Pressure</td>
                            <td>{Math.floor(data.main.pressure)} hPa</td>
                        </tr>
                        <tr>
                            <td>Humidity</td>
                            <td>{Math.floor(data.main.humidity)}%</td>
                        </tr>     
                        <tr>
                            <td>Cloud</td>
                            <td>{data.clouds.all}%</td>
                        </tr>                        
                        <tr>
                            <td>Geo Location</td>
                            <td>[{data.coord.lat}, {data.coord.lon}]</td>
                        </tr>           
                        <tr>
                            <td>City / Municipal ID</td>
                            <td>{data.id}</td>
                        </tr>                               
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
};

export default weather;