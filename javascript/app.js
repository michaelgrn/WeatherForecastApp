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
        const {datetime, high_temp, low_temp, wind_spd, wind_cdir} = data['data']['0'];
        const {icon, description} = data['data']['0']["weather"];
        const d = new Date(datetime)
        let day = weekday[d.getDay()];
        console.log(city_name, day, datetime, low_temp, high_temp, description,icon, wind_spd, wind_cdir);
        document.querySelector(".day").innerText = day;
        document.querySelector(".date").innerText = datetime;
        document.querySelector(".temp-low").innerText = "Low: " + low_temp;
        document.querySelector(".temp-high").innerText = "High: " + high_temp;
        document.querySelector(".weather-state").innerHTML = description;
        document.querySelector(".icon").src = "https://www.weatherbit.io/static/img/icons/"+ icon+".png";
        document.querySelector(".wind-speed").innerHTML = wind_spd + "mph";
        document.querySelector(".wind-direction").innerHTML = wind_cdir;
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