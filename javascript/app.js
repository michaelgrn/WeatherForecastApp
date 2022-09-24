let weather = {
    "apikey": "7374afdfe8c04b72931d05680d8f1717",
    getWeather: function(city){
        fetch(
            "https://api.weatherbit.io/v2.0/forecast/daily?city="
            + city
            +"&units=I" //can change to metric later?
            +"&key="
            + this.apikey
        )
            .then((response) => response.json())
            .then((data) =>this.showWeather(data));
    },

    // ● Day of the week
    // ● Date
    // ● Temperature (high and low)
    // ● Weather State (sunny, cloudly, rainy, snowy, etc)
    // ● Weather Icons (matching weather state)
    // ● Wind speed & direction
    showWeather: function(data){
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const {city_name} = data;
        for(let x = 0; x < 7; x++) {
            const {datetime, high_temp, low_temp, wind_spd, wind_cdir} = data['data'][x.toString()];
            const {icon, description} = data['data'][x.toString()]["weather"];
            const d = new Date(datetime)
            let day = weekday[d.getDay()];
            console.log(city_name, day, datetime, low_temp, high_temp, description, icon, wind_spd, wind_cdir);
            document.querySelector("#day-"+x.toString()).innerText = day;
            document.querySelector("#date-"+x.toString()).innerText = datetime;
            document.querySelector("#temp-low-"+x.toString()).innerText = "Low: " + low_temp;
            document.querySelector("#temp-high-"+x.toString()).innerText = "High: " + high_temp;
            document.querySelector("#weather-state-"+x.toString()).innerHTML = description;
            document.querySelector("#icon-"+x.toString()).src = "https://www.weatherbit.io/static/img/icons/" + icon + ".png";
            document.querySelector("#wind-speed-"+x.toString()).innerHTML = wind_spd + "mph";
            document.querySelector("#wind-direction-"+x.toString()).innerHTML = wind_cdir;
        }
    },
    search: function () {
        this.getWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });