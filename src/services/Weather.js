import axios from "axios";
const API_KEY = "7Y1rGpuIcqLAgHlN7tn0DYcPHNarxVLs";
const AccuWeatherAPI_URL = "https://dataservice.accuweather.com/";

/**
 * Search city in AccuWeather API
 * 
 * @param {*} search_city city name
 * @returns 
 */
export const searchCity = async (search_city) => {
    return await axios.get(`${AccuWeatherAPI_URL}locations/v1/cities/search?apikey=${API_KEY}&q=${search_city}`).then((res) => {
        return res.data;
    });
}

/**
 * 1 Day of Daily Forecasts from AccuWeather
 * 
 * @param {*} locationKey location key which is get from AccuWeather city search API
 * @returns 
 */
export const getWeatherData = async (locationKey) => {
    return await axios.get(`${AccuWeatherAPI_URL}forecasts/v1/daily/1day/${locationKey}?apikey=${API_KEY}`).then((res) => {
        return res.data;
    });
}
/**
 * current conditions data for a specific location from AccuWeather
 * 
 * @param {*} locationKey location key which is get from AccuWeather city search API
 * @returns 
 */
export const getCurrentWeatherData = async (locationKey) => {
    return await axios.get(`${AccuWeatherAPI_URL}currentconditions/v1/${locationKey}?apikey=${API_KEY}`).then((res) => {
        return res.data;
    });
}

/**
 * Get information about a specific location, by GeoPosition (Latitude and Longitude).
 * 
 * @param {*} latlon Latitude and Longitude of user location
 * @returns 
 */
export const getCurrentLocationData = async (latlon) => {
    return await axios.get(`${AccuWeatherAPI_URL}locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latlon}`).then((res) => {
        return res.data;
    });
}