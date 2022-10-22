/**
 * Object designed to access weatherbit.io and populate the webapp
 * with weather information.
 */
let weather = {

    "apikey": "7374afdfe8c04b72931d05680d8f1717",

    /**
     * Function designed to fetch api information and pass that json
     * off to showWeather()
     *
     * @param  {string} city Name of the city to generate the forecast for
     */
    getWeather: function(city){
        fetch(
            "https://api.weatherbit.io/v2.0/forecast/daily?city="
            + city
            +"&units=I"
            +"&days=7"
            +"&key="
            + this.apikey
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No weather found. Please double check your that your query matches the format of \"City, State, Country\" or \"City, County\".");
                }
                return response.json();
            }).catch(err => alert("No weather found. Please double check your that your query matches the format of \"City, State, Country\" or \"City, County\"."))
            .then((data) => this.showWeather(data));
    },
    /**
     * Function designed to populate the webpage with the following information
     *      ● Day of the week
     *      ● Date
     *      ● Temperature (high and low)
     *      ● Weather State (sunny, cloudly, rainy, snowy, etc)
     *      ● Weather Icons (matching weather state)
     *      ● Wind speed & direction
     * Code currently commented out to populate name of city in designated field
     * for later iteration.
     * @param  {json} data  json from weatherbit.io api call
     */
    showWeather: function(data){
        console.log(data);
        const weekday = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
        const {city_name, state_code, country_code} = data;

        for(let x = 0; x < 7; x++) {
            const {datetime, high_temp, low_temp, wind_spd, wind_cdir} = data['data'][x.toString()];
            const {icon, description} = data['data'][x.toString()]["weather"];
            const d = new Date(datetime)

            let day = weekday[d.getDay()];
            let date = datetime.split("-")[2];

            document.querySelector("#date-"+x.toString()).innerHTML = day + " " + date;
            document.querySelector("#temp-"+x.toString()).innerHTML = "<b>" + high_temp + "°" + "</b>/" + low_temp + "°";
            document.querySelector("#weather-state-"+x.toString()).innerHTML = description;
            document.querySelector("#icon-"+x.toString()).src = "img/icons/" + icon + ".png";
            document.querySelector("#wind-speed-"+x.toString()).innerHTML ="<img src = img/icons/icon-wind.png alt=\"Small icon depicting the wind\" id = \"wind-speed-icon\"> " + wind_cdir + " " + wind_spd + " mph " ;
        }

        // clears the Search-Bar
        document.querySelector(".city-current").innerHTML =  city_name;
        if (state_code.match(/\d+/g) != null) {
            document.querySelector(".city-current-full").innerHTML =  city_name + ", "  + country_code;
        } else {
            document.querySelector(".city-current-full").innerHTML =  city_name +", "+ state_code + ", " + country_code;
        }
        document.getElementById('weather-search').value = '';
        weather.getCurrent(city_name)

    },
    /**
     * Function designed to get current Temperature of designated city.
     * @param {string} city Name of city to get current forecast for
     */
    getCurrent: function(city){
        fetch(
            "https://api.weatherbit.io/v2.0/current?city="
            + city
            +"&units=I"
            +"&key="
            + this.apikey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found. Please double check your that your query matches the format of \"City, State, Country\" or \"City, County\".");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.showCurrent(data));

    },
    /**
     * Function used in conjunction with getCurrent() to populate fields         *
     * @param {json} data Data for the city to get current forecast for
     */
    showCurrent: function(data){
        console.log(data['data']['0']);
        const {app_temp} = data['data']['0'];
        const {icon} = data['data']['0']['weather'];
        document.querySelector("#icon-current").src = "img/icons/" + icon + ".png";
        document.querySelector(".temp-current").innerHTML = app_temp + "°F";

    },
    /**
     * Function used with a listener to pass value of search-bar to getWeather
     */
    search: function () {
        this.getWeather(document.querySelector(".search-bar").value);
    },
};

// Add listener to search-button
document.querySelector(".search-button").addEventListener("click", function () {
    weather.search();
});

// Add listener to search-bar
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

// Autopopulate website with Boise weather
weather.getWeather("Boise,ID");