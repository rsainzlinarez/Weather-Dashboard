

    // var cityName =Portland;
    // var weather = $(this).attr("data-name");

var queryURLTwo = " https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=546de1fd66b329cf4085b588c55671b8";


    alert(queryURLTwo);

    
    // Provides today's weather information
    $("#find-city").on("click", function(event){
        alert('hi');
        var city = $("#city-input").val();
        event.preventDefault();  
         var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=546de1fd66b329cf4085b588c55671b8";
         
            
        console.log(queryURL);
        console.log(city);

        $.ajax({
            url: queryURL,
            method: "GET"
         }).then(function(response) {
    
            $(".temperatureToday").html("<h3>" + "Temperature:  " + response.main.temp + "</h3>");
            $(".humidity").html("<h3>" + "Humidity: " + response.main.humidity + "</h3>");
            $(".windSpeed").html("<h3>" + "Wind Speed: " + response.wind.speed+ "</h3>");
            console.log(response);
            
        });
    
});
    

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

// Five Day Forecast
$("#find-city").on("click", function(event){
    var city = $("#city-input").val();
        event.preventDefault(); 
    var queryURLThree = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=546de1fd66b329cf4085b588c55671b8";
    
        $.ajax({
            url: queryURLThree,
            method: "Get"

        }).then(function(response) {
            $(".dayOne").html("<h3>" + response.list[1].dt_txt + "</h3>");
            $(".dayTwo").html("<h3>" + response.list[9].dt_txt + "</h3>");
            $(".dayThree").html("<h3>" + response.list[17].dt_txt + "</h3>");
            $(".dayFour").html("<h3>" + response.list[25].dt_txt + "</h3>");
            $(".dayFive").html("<h3>" + response.list[33].dt_txt + "</h3>");


        });

});

