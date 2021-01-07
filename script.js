    // var weather = $(this).attr("data-name");
// Global Variables
var citiesList = [];
var lastCity = '';

// ========================Initial function to gets search history=======================
function int() {
    var savedCities = JSON.parse(localStorage.getItem("citiesList"));

    $("<button>").html(savedCities);
 
    if (savedCities !== null) {
     citiesList = savedCities;
   }
   renderButtons();
 }
 int();

// ==============================Function to search weather information=======================
$("#find-city").on("click", function(event){
    event.preventDefault(); 

    // Pushes city searched to citiesList array
    var cityAdd = $("#city-input").val().trim();
    citiesList.push(cityAdd);

    // Calls weather function
    weatherInformation(cityAdd);
    // Calls function to create buttons
    renderButtons();
    // Calls function that stores searched cities
    storeSearches();
   
});


// ==========================Function provides weather information================================
function weatherInformation(city){
    
    // Get the city entered in seach section
       
        // console.log(city);
        // (300K − 273.15) × 9/5 + 32 = -459.7°F

//   -----------------------------Current Weather Information ajax--------------------------------
        // api query URL
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +city +"&appid=546de1fd66b329cf4085b588c55671b8";  
       
        console.log(queryURL);    
    // Current weather ajax
    $.ajax({
            url: queryURL,
            method: "GET"
         }).then(function(response) {
             $(".currentCity").html("<h4>"  + response.name + "</h4>");
            $(".temperatureToday").html("<h4>" + "Temperature:  " + response.main.temp + "</h4>");
            $(".humidity").html("<h3>" + "Humidity: " + response.main.humidity + "</h3>");
            $(".windSpeed").html("<h3>" + "Wind Speed: " + response.wind.speed+ "</h3>");
            // console.log(response);
            getUvIndex(response.coord.lat, response.coord.lon);
            // console.log(response.coord.lat, response.coord.lon);
            console.log(response.weather[0].icon);
            // console.log("http://openweathermap.org/img/wn/" + response.weather[1].icon + "@2x.png");
            $(".weatherIcon").html("<img src=http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png >");
    });

// -------------------------------Five Day Weather Information ajax----------------------------------
    // api query URL
    var queryURLThree = "https://api.openweathermap.org/data/2.5/forecast?q=" +city + "&appid=546de1fd66b329cf4085b588c55671b8";
    console.log(queryURLThree);
    
    // var queryImage = "http://openweathermap.org/img/wn/" + response.list.weather + "@2x.png";
        

    // Five day weather ajax
    $.ajax({
        url: queryURLThree,
        method: "Get"
    }).then(function(response) {
        $(".dateOne").html("<h3>" + response.list[1].dt_txt + "</h3>");
        $(".humidityOne").html("<h3>" + "Humidity:  " + response.list[1].main.humidity + "%" + "</h3>");
        $(".tempOne").html("<h3>" + "Temp:  " + response.list[1].main.temp + "</h3>");
        $(".iconOne").html("<img src=http://openweathermap.org/img/wn/" + response.list[1].weather[0].icon + "@2x.png >");
       

        $(".dateTwo").html("<h3>" + response.list[9].dt_txt + "</h3>");
        $(".humidityTwo").html("<h3>" + "Humidity:  " + response.list[9].main.humidity + "%" + "</h3>");
        $(".tempTwo").html("<h3>" + "Temp:  " + response.list[9].main.temp + "</h3>");
        $(".iconTwo").html("<img src=http://openweathermap.org/img/wn/" + response.list[9].weather[0].icon + "@2x.png >");

        $(".dateThree").html("<h3>" + response.list[17].dt_txt + "</h3>");
        $(".humidityThree").html("<h3>" + "Humidity:  " + response.list[17].main.humidity + "%" + "</h3>");
        $(".tempThree").html("<h3>" + "Temp:  " + response.list[17].main.temp + "</h3>");
        $(".iconThree").html("<img src=http://openweathermap.org/img/wn/" + response.list[17].weather[0].icon + "@2x.png >");
        
        
        $(".dateFour").html("<h3>" + response.list[25].dt_txt + "</h3>");
        $(".humidityFour").html("<h3>" + "Humidity:  " + response.list[25].main.humidity + "%" + "</h3>");
        $(".tempFour").html("<h3>" + "Temp:  " + response.list[25].main.temp + "</h3>");
        $(".iconFour").html("<img src=http://openweathermap.org/img/wn/" + response.list[25].weather[0].icon + "@2x.png >");
       

        $(".dateFive").html("<h3>" + response.list[33].dt_txt + "</h3>");
        $(".humidityFive").html("<h3>" + "Humidity:  " + response.list[33].main.humidity + "%" + "</h3>");
        $(".tempFive").html("<h3>" + "Temp:  " + response.list[33].main.temp + "</h3>");
        $(".iconFive").html("<img src=http://openweathermap.org/img/wn/" + response.list[33].weather[0].icon + "@2x.png >");
       

        
    });
}


// =====================================UV Index Ajax Function=====================================
function getUvIndex(lat, lon) {
    // api query url
    var queryURLTwo = " https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=546de1fd66b329cf4085b588c55671b8";
    // Uv index ajax
    $.ajax({
            url: queryURLTwo,
            method: "GET"
    }).then(function(response) {
            $(".uvIndex").html("<h3>" + "UV Index:  " + response.current.uvi + "</h3>");
            // console.log(response);
    });
}
    getUvIndex();


// =================== Renders the buttons that will contain recent searches========================   
function renderButtons(){
    $("#recentCities").empty();
    for (var i = 0; i < citiesList.length; i++){
            var a = $("<button>");
            a.addClass("savedCity");
            a.attr("data-name", citiesList[i]);
            a.text(citiesList[i]);
        $("#recentCities").append(a);
    }
}


// ========================= Stores Search history====================================================
function storeSearches() {
    localStorage.setItem("citiesList", JSON.stringify(citiesList));
}


// =============================================================================
$(document).on('click', '.savedCity', function() {
    
    var temporary = $(this).data('name');
    // console.log(temporary);
    weatherInformation(temporary);

  });

  weatherInformation();