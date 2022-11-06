import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { getCurrentLocationData, searchCity } from "../services/Weather";
import cogoToast from 'cogo-toast';
import WeatherCard from "./WeatherCard";

function WeatherHome() {
    const [validated, setValidated] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [locationKey, setLocationKey] = useState("");
    const [locationDt, setLocationDt] = useState([]);

    const handleSubmit = (event => {
        const form = event.currentTarget;
        const formLength = form.length;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            for (let i = 0; i < formLength; i++) {
                const elem = form[i];
                const errorLabel = elem.parentNode.querySelector(".invalid-feedback");
                if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
                    if (!elem.validity.valid) {
                      errorLabel.textContent = elem.validationMessage;
                    } else {
                      errorLabel.textContent = "";
                    }
                }
            }
        }
        setValidated(true);

        //save after validation success
        if (form.checkValidity() === true) {
            setSubmitDisabled(true);
            // const data = new FormData(event.target);
            const search_city = form.querySelector('[name="search_city"]').value;
            console.log(search_city);
            
            searchCity(search_city).then(response => {
                console.log(response)
                if(response.length > 0){
                    setLocationDt(response[0]);
                    setLocationKey(response[0].Key);
                }else{
                    cogoToast.error(search_city + " city is not found in AccuWeather API.", {position: 'top-center'});
                }
                setSubmitDisabled(false);
            }).catch( error => {
                setSubmitDisabled(false);
                // cogoToast.error(error.response.data.message, {position: 'top-center'});
            });
            
        }

    });

    const handleCurrentLocationData = async (latlon) => {
        getCurrentLocationData(latlon).then(response => {
            console.log(response)
            if(response.Key){
                setLocationDt(response);
                setLocationKey(response.Key);
            }
        }).catch( err => err);
    };

    useEffect(() => {
        if(locationKey === ""){
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
                const latlon = position.coords.latitude + "," + position.coords.longitude;
                handleCurrentLocationData(latlon);
            });
        }
    }, [])

    return ( 
        <div>
            <Container fluid className="p-3">
                <div className="main-body text-center">
                    <div className="main-body-content">
                        <Row>
                            <Col sm={12} md={12} className="p-5 aw-form">
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    
                                    <Form.Group as={Col} className="mb-3">
                                        <Form.Control type="text" name="search_city" required placeholder="Enter the name of a city" />
                                        <Form.Control.Feedback type="invalid" />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <button type='submit' className='btn btn-primary' disabled={ submitDisabled }  >
                                            { submitDisabled &&
                                                <Spinner animation="border" role="status" size="sm" className="mr-2">
                                                    
                                                </Spinner>
                                            }
                                            { !submitDisabled && <i className="mdi mdi-check"></i> }
                                            Show Weather Info
                                        </button>
                                    </Form.Group>
                                    
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={12}>
                                {
                                    (locationKey && locationKey !== "") && <WeatherCard locationKey = {locationKey}  locationDt = {locationDt} />
                                }
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        </div>
     );
}

export default WeatherHome;