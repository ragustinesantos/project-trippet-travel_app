import React from "react";
import { Link } from "react-router-dom";

// Import Components
import TodayCard from "../components/TodayCard";
import FutureCard from "../components/FutureCard";

// Import images
import cloudy from "../assets/cloudy_no_bg.gif"
import overcast from "../assets/overcast_no_bg.gif"
import sunny from "../assets/sunny_no_bg.gif"
import rainy from "../assets/rain_no_bg.gif"
import snow from "../assets/snow_no_bg.gif"
import freeze from "../assets/freeze_no_bg.gif"
import drizzle from "../assets/drizzle_no_bg.gif"
import storm from "../assets/storm_no_bg.gif"

// Import background images
import cloudyBg from "../assets/sunny_bg.png";
import overcastBg from "../assets/overcast_bg_2.jpg";
import sunnyBg from "../assets/sunny_bg_2.jpg";
import rainyBg from "../assets/rain_bg.jpg";
import snowBg from "../assets/snow_bg.jpg";
import freezeBg from "../assets/freeze_bg.jpg";
import drizzleBg from "../assets/drizzle_bg.jpg";
import stormBg from "../assets/storm_bg.jpg";

// Weather App Page
export default function WeatherApp() {

    // State
    const [location, setLocation] = React.useState("Calgary");
    const [search, setSearch] = React.useState({location: ""});
    const [weatherDetails, setWeatherDetails] = React.useState({});
    const [forecast, setForecast] = React.useState([]);
  
    // Default location for weather forecast = based on user IP
    React.useEffect(() => {

            fetch('https://api.ipregistry.co/?key=8cc86xe2qhpclo6g&pretty=true')
            .then(res => res.json())
            .then(data => setLocation(data.location.city));

    },[]);

    // Retrieve current weather data for location set in state
    React.useEffect(() => {

            fetch(`http://api.weatherapi.com/v1/forecast.json?key=594f3355ab1249b495714846232703&q=${location}&days=1&aqi=no&alerts=no`)
            .then(res => res.json())
            .then(data => setWeatherDetails({
                country: data.location.country,
                city: data.location.name,
                celsius: data.current.temp_c,
                farenheit: data.current.temp_f,
                condition: data.current.condition.text,
                sunrise: data.forecast.forecastday[0].astro.sunrise,
                sunset: data.forecast.forecastday[0].astro.sunset,
                date: data.forecast.forecastday[0].date,
                timezone: data.location.tz_id
            }))

    }, [location])

    // Retrieve weather forecast for the next 6 days
    React.useEffect(() => {

            fetch(`http://api.weatherapi.com/v1/forecast.json?key=594f3355ab1249b495714846232703&q=${location}&days=7&aqi=no&alerts=no`)
            .then(res => res.json())
            .then(data => data.forecast.forecastday)
            .then(forecastday => setForecast(forecastday.slice(1).map(day => {
                return {
                    date: day.date,
                    celsius: day.day.avgtemp_c,
                    farenheit: day.day.avgtemp_f,
                    condition: day.day.condition.text,
                }
            })))

    }, [location])

    // Weather Conditions based on return values of Weather API
    const conditionMap = {
        cloudCondition : ["Cloudy", "Partly cloudy"],
        sunCondition : ["Sunny", "Clear"],
        rainCondition : ["Moderate rain at times", "Moderate rain", "Heavy rain at times", "Heavy rain", 
                        "Moderate or heavy freezing rain", "Moderate or heavy rain shower", "Torrential rain shower", 
                        "Heavy freezing drizzle"],
        drizzleCondition : ["Patchy rain possible", "Patchy freezing drizzle possible", "Patchy light drizzle", "Light drizzle",
                            "Freezing drizzle", "Patchy light rain", "Light rain", "Light freezing rain", "Light rain shower"],
        overcastCondition : ["Overcast", "Fog", "Mist"],
        snowCondition : ["Patchy snow possible", "Patchy sleet possible", "Blowing snow", "Light sleet", "Patchy light snow", 
                        "Light snow", "Patchy moderate snow", "Moderate snow", "Light snow showers", "Light sleet showers", 
                        "Light showers of ice pellets"],
        freezeCondition : ["Blizzard", "Freezing fog", "Moderate or heavy sleet", "Patchy heavy snow", "Heavy snow", "Ice pellets", 
                            "Moderate or heavy sleet showers", "Moderate or heavy snow showers", "Moderate or heavy showers of ice pellets"],
        stormCondition : ["Thundery outbreaks possible", "Patchy light rain with thunder", "Moderate or heavy rain with thunder", 
                        "Patchy light snow with thunder", "Moderate or heavy snow with thunder"]
    };

    // Image objects based on weather condition key values
    const imageMap = {
        cloudCondition : cloudy,
        sunCondition : sunny,
        rainCondition : rainy,
        drizzleCondition : drizzle,
        overcastCondition : overcast,
        snowCondition : snow,
        freezeCondition : freeze,
        stormCondition : storm
    };

    const backgroundImageMap = {
        cloudCondition : cloudyBg,
        sunCondition : sunnyBg,
        rainCondition : rainyBg,
        drizzleCondition : drizzleBg,
        overcastCondition : overcastBg,
        snowCondition : snowBg,
        freezeCondition : freezeBg,
        stormCondition : stormBg
    };

    // Render Future component based on the available date in forecast state
    const renderFuture = forecast.map(data => 
        <FutureCard
            date={data.date}
            celsius={data.celsius}
            farenheit={data.farenheit}
            condition={data.condition}
            conditionMap={conditionMap}
            imageMap={imageMap}
        />)
    
    // Render TodayCard component based on the available information in weatherDetails
    const renderToday = <TodayCard
        country={weatherDetails.country}
        city={weatherDetails.city}
        date={weatherDetails.date}
        condition={weatherDetails.condition}
        sunrise={weatherDetails.sunrise}
        sunset={weatherDetails.sunset}
        timezone={weatherDetails.timezone}
        celsius={weatherDetails.celsius}
        farenheit={weatherDetails.farenheit}
        conditionMap={conditionMap}
        imageMap={imageMap}
    />

    // Conditional render of background based on current weather condition in weatherDetails
    function styleBackground() {
        const condition = Object.keys(conditionMap).find(key => conditionMap[key].includes(weatherDetails.condition));
        return {backgroundImage: `url(${backgroundImageMap[condition]})`}
    }

    // Function that stores text typed in input box in search state
    function handleLocation(event) {
        const {name, value} = event.target
        setSearch({
            [name]: value
        })
    }

    // Function that sets what's written in the input box as the location
    function searchLocation() {
        setLocation(search.location)
    }

    return (

    <body style={styleBackground()}>

        {/* Navbar */}
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Trippet</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link" aria-current="page" href="/">Home</a>
                        <Link class="nav-link" to="/">Weather</Link>
                        <a class="nav-link" href='#'>Currency</a>
                    </div>
                </div>
            </div>
        </nav>
    
        <main>
            <div className="current--body">
                <div className="currency--title">
                    <span>Weather Forecast</span>
                </div>
                <div className="current--search">
                    <input 
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={search.location}
                        onChange={handleLocation}
                    />
                    <button 
                        onClick={searchLocation}
                        className="current--searchButton"
                    > Search 
                    </button>
                </div>
                <div className="current--all">
                    {renderToday}
                    <div className="current--forecast">
                        {renderFuture}
                    </div>
                </div>
            </div>
        </main>
        <footer>
            <div>Developed by Raymond Santos</div>
            <div>©2023</div>
        </footer>
    </body>

    )
  }