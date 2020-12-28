

    // var cityName =Portland;
    // var weather = $(this).attr("data-name");
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + "Portland" + "&appid=546de1fd66b329cf4085b588c55671b8";
var queryURLTwo = " https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=546de1fd66b329cf4085b588c55671b8";
var queryURLThree = "http://api.openweathermap.org/data/2.5/forecast?q=Salem,,OR&appid=546de1fd66b329cf4085b588c55671b8";

    console.log(queryURLTwo);

    
    // Provides today's weather information
    function getCurrentWeather(){
        $.ajax({
            url: queryURL,
            method: "GET"
         }).then(function(response) {
    
            $(".temperatureToday").html("<h3>" + "Temperature:  " + response.main.temp + "</h3>");
            $(".humidity").html("<h3>" + "Humidity: " + response.main.humidity + "</h3>");
            $(".windSpeed").html("<h3>" + "Wind Speed: " + response.weather[0].icon+ "</h3>");
            // console.log(response);
            // console.log(response.wind.speed);
        });

      
    }
    getCurrentWeather();
    // Provides the UV Index
    function getUvIndex() {

        $.ajax({
            url: queryURLTwo,
            method: "GET"
        }).then(function(response) {
            $(".uvIndex").html("<h3>" + "UV Index:  " + response.current.uvi + "</h3>");
            // console.log(response.current.uvi)
        });
    }
    getUvIndex();

    function fiveDayForecast() {
        $.ajax({
            url: queryURLThree,
            method: "Get"

        }).then(function(response) {
            $(".dayOne").html("<h3>" + response.list[1].dt_txt + "</h3>");
            $(".dayTwo").html("<h3>" + response.list[9].dt_txt + "</h3>");
            $(".dayThree").html("<h3>" + response.list[17].dt_txt + "</h3>");
            $(".dayFour").html("<h3>" + response.list[25].dt_txt + "</h3>");
            $(".dayFive").html("<h3>" + response.list[33].dt_txt + "</h3>");

            console.log(response);
            console.log(response.list[0]);

        });

    }
    fiveDayForecast();



