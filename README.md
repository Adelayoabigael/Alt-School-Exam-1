WEATHER APP
Project Overview
This Weather App is a responsive web application that allows users to search for any city in the world and view real-time weather information along with a 5-day weather forecast. The application retrieves live weather data from the Open-Meteo API and presents it in a clean, user-friendly interface.
The project was developed using HTML, CSS, and JavaScript, demonstrating the use of semantic web design, responsive layouts, asynchronous programming, API integration, and dynamic DOM manipulation.

FEATURES
- Search for weather information by city name
- Display current weather conditions
- Show city name and country
- Display current temperature in degrees Celsius
- Show weather descriptions based on WMO weather codes
- Display humidity percentage
- Display wind speed in km/h
- Display UV Index information
- Present a 5-day weather forecast
- Responsive design for desktop and mobile devices
- Loading indicator while data is being fetched
- Error handling for invalid city searches
- Interactive hover effects and smooth transitions

TECHNOLOGIES USED
- HTML5
Semantic page structure using:
<header>
<main>
<section>
Search form and dynamic content containers
  
- CSS
Responsive layout design
CSS Grid and Flexbox
Media queries for mobile devices
Hover effects and animations
Custom colour scheme matching project requirements

- JavaScript
DOM manipulation
Event handling
Async/Await
Fetch API
Error handling
Dynamic content generation

API INFORMATION
This application uses the Open-Meteo API, which provides free access to weather and geocoding data without requiring an API key.
- Geocoding API
- Converts a city name into geographic coordinates (latitude and longitude).
- Weather Forecast API
- Uses the coordinates to retrieve:
- Current temperature
- Weather conditions
- Humidity
- Wind speed
- UV Index
- 5-day forecast

APPLICATION WORKFLOW
- User enters a city name.
- The Geocoding API retrieves the city's coordinates.
- The Weather API retrieves weather data using those coordinates.
- Current weather information is displayed.
- A 5-day forecast is generated dynamically.
- Any errors are displayed to the user if the city cannot be found.

During development, several challenges were addressed:
- Understanding and implementing API requests.
- Converting city names into coordinates before retrieving weather data.
- Mapping WMO weather codes into readable weather descriptions.
- Dynamically generating forecast cards from API responses.
- Handling user input validation and error messages.

LEARNING OUTCOMES
This project helped strengthen skills in:
- Working with third-party APIs
- Asynchronous JavaScript programming
- Fetching and processing JSON data
- Responsive web design
- Dynamic DOM manipulation
- Error handling and debugging
- Building complete front-end applications

CONCLUSION
- This Weather App successfully meets the project requirements by providing real-time weather information and a 5-day forecast through a clean,
- responsive interface. The project demonstrates effective use of HTML, CSS, JavaScript, and API integration while following modern web development practices.
