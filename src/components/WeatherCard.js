import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

import '../custom_assets/css/weather_card.css';
import { getCurrentWeatherData, getWeatherData } from '../services/Weather';

function WeatherCard(props) {
    const [weatherData, setWeatherData] = useState([]);
    const [currentWeatherData, setCurrentWeatherData] = useState([]);

    const fetchWeather = async (locationKey) => {
        getWeatherData(locationKey).then(response => {
            console.log(response)
            if(response.Headline){
                setWeatherData(response);
            }
        }).catch( err => err);

        getCurrentWeatherData(locationKey).then(response => {
            console.log(response)
            if(response.length > 0){
                setCurrentWeatherData(response[0]);
            }
        }).catch( err => err);
    };

    useEffect(() => {
        if(props.locationKey !== ""){
            console.log("enn")
            fetchWeather(props.locationKey);
        }
    }, [props.locationKey])

    return ( 
        <div>
            
            <div className="weather_wrapper">
                <div className="weatherCard">
                    <div className="currentTemp">
                        <span className="category">{(weatherData.Headline) && weatherData.Headline.Category}</span>
                        <span className="temp">{(currentWeatherData && currentWeatherData.Temperature) && Math.round(currentWeatherData.Temperature.Metric.Value)}&deg;<small>C</small></span>
                        <span className="location">{props.locationDt.LocalizedName && props.locationDt.LocalizedName}<sup>{props.locationDt.Country && props.locationDt.Country.ID}</sup></span>
                    </div>
                    <div className="currentWeather">
                        <span className="conditions">
                            {(weatherData.Headline && weatherData.Headline.Category == "record heat") && 
                                <>&#xf072;</>
                            }
                            {(weatherData.Headline && weatherData.Headline.Category == "heat") && 
                                <>&#xf00d;</>
                            }
                            {(weatherData.Headline && weatherData.Headline.Category == "rain") && 
                                <>&#xf008;</>
                            }
                            {(weatherData.Headline && weatherData.Headline.Category == "thunderstorm") && 
                                <>&#xf010;</>
                            }
                            {(weatherData.Headline && weatherData.Headline.Category == "cooler") && 
                                <>&#xf001;</>
                            }
                            {(weatherData.Headline && weatherData.Headline.Category == "snow/rain") && 
                                <>&#xf065;</>
                            }
                            {(weatherData.Headline && weatherData.Headline.Category == "snow") && 
                                <>&#xf01b;</>
                            }
                            {(weatherData.Headline && weatherData.Headline.Category == "air quality") && 
                                <>&#xf013;</>
                            }
                            {(!weatherData.Headline || !["record heat", "heat", "rain", "thunderstorm", "cooler", "snow/rain", "snow", "air quality"].includes(weatherData.Headline.Category)) && 
                                <>&#xf00d;</>
                            }
                        </span>
                        <div className="info">
                            <span className="min-temp">{(weatherData.DailyForecasts) && Math.round((weatherData.DailyForecasts[0].Temperature.Minimum.Value - 32) * 5/9)}&deg;c Min</span>
                            <span className="max-temp">{(weatherData.DailyForecasts) && Math.round((weatherData.DailyForecasts[0].Temperature.Maximum.Value - 32) * 5/9)}&deg;c Max</span>
                        </div>
                    </div>
                </div>
                <div className='weatherInfo'>Note: {(weatherData.Headline) && weatherData.Headline.Text}</div>
            </div>


        </div>
     );
}

export default WeatherCard;