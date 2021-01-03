    // var weather = $(this).attr("data-name");
// Global Variables
var citiesList = [];

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
    weatherInformation();
    // Calls function to create buttons
    renderButtons();
    // Calls function that stores searched cities
    storeSearches();
   
});


// ==========================Function provides weather information================================
function weatherInformation(){
    // Get the city entered in seach section
        var city = $("#city-input").val();
    

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
    });

// -------------------------------Five Day Weather Information ajax----------------------------------
    // api query URL
    var queryURLThree = "https://api.openweathermap.org/data/2.5/forecast?q=" +city + "&appid=546de1fd66b329cf4085b588c55671b8";

    // Five day weather ajax
    $.ajax({
        url: queryURLThree,
        method: "Get"
    }).then(function(response) {
        $(".dateOne").html("<h3>" + response.list[1].dt_txt + "</h3>");
        $(".humidityOne").html("<h3>" + "Humidity:  " + response.list[1].main.humidity + "%" + "</h3>");
        $(".tempOne").html("<h3>" + "Temp:  " + response.list[1].main.temp + "</h3>");

        $(".dateTwo").html("<h3>" + response.list[9].dt_txt + "</h3>");
        $(".humidityTwo").html("<h3>" + "Humidity:  " + response.list[9].main.humidity + "%" + "</h3>");
        $(".tempTwo").html("<h3>" + "Temp:  " + response.list[9].main.temp + "</h3>");

        $(".dateThree").html("<h3>" + response.list[17].dt_txt + "</h3>");
        $(".humidityThree").html("<h3>" + "Humidity:  " + response.list[17].main.humidity + "%" + "</h3>");
        $(".tempThree").html("<h3>" + "Temp:  " + response.list[17].main.temp + "</h3>");
        
        
        $(".dateFour").html("<h3>" + response.list[25].dt_txt + "</h3>");
        $(".humidityFour").html("<h3>" + "Humidity:  " + response.list[25].main.humidity + "%" + "</h3>");
        $(".tempFour").html("<h3>" + "Temp:  " + response.list[25].main.temp + "</h3>");
       

        $(".dateFive").html("<h3>" + response.list[33].dt_txt + "</h3>");
        $(".humidityFive").html("<h3>" + "Humidity:  " + response.list[33].main.humidity + "%" + "</h3>");
        $(".tempFive").html("<h3>" + "Temp:  " + response.list[33].main.temp + "</h3>");
      
      
    });
}


// =====================================UV Index Ajax Function=====================================
function getUvIndex() {
    // api query url
    var queryURLTwo = " https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=546de1fd66b329cf4085b588c55671b8";
    // Uv index ajax
    $.ajax({
            url: queryURLTwo,
            method: "GET"
    }).then(function(response) {
            $(".uvIndex").html("<h3>" + "UV Index:  " + response.current.uvi + "</h3>");
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

$( ".savedCity" ).on( "click", function() {
    
    var temporary = $(this).text();
   
    
    // weatherInformation(temporary);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +temporary +"&appid=546de1fd66b329cf4085b588c55671b8";  
       
    console.log(queryURL);    
// Current weather ajax
$.ajax({
        url: queryURL,
        method: "GET"
     }).then(function(response) {

         $(".currentCity").html("<h3>" + response.name + "</h3>");
        $(".temperatureToday").html("<h3>" + "Temperature:  " + response.main.temp + "</h3>");
        $(".humidity").html("<h3>" + "Humidity: " + response.main.humidity + "</h3>");
        $(".windSpeed").html("<h3>" + "Wind Speed: " + response.wind.speed+ "</h3>");
        // console.log(response);
});

    // -------------------------------Five Day Weather Information ajax----------------------------------
    // api query URL
    var queryURLThree = "https://api.openweathermap.org/data/2.5/forecast?q=" +temporary + "&appid=546de1fd66b329cf4085b588c55671b8";

    // Five day weather ajax
    $.ajax({
        url: queryURLThree,
        method: "Get"
    }).then(function(response) {
        console.log(response);
        $(".dateOne").html("<h3>" + response.list[1].dt_txt + "</h3>");
        $(".humidityOne").html("<h3>" + "Humidity:  " + response.list[1].main.humidity + "%" + "</h3>");
        $(".tempOne").html("<h3>" + "Temp:  " + response.list[1].main.temp + "</h3>");

        $(".dateTwo").html("<h3>" + response.list[9].dt_txt + "</h3>");
        $(".humidityTwo").html("<h3>" + "Humidity:  " + response.list[9].main.humidity + "%" + "</h3>");
        $(".tempTwo").html("<h3>" + "Temp:  " + response.list[9].main.temp + "</h3>");

        $(".dateThree").html("<h3>" + response.list[17].dt_txt + "</h3>");
        $(".humidityThree").html("<h3>" + "Humidity:  " + response.list[17].main.humidity + "%" + "</h3>");
        $(".tempThree").html("<h3>" + "Temp:  " + response.list[17].main.temp + "</h3>");
        
        
        $(".dateFour").html("<h3>" + response.list[25].dt_txt + "</h3>");
        $(".humidityFour").html("<h3>" + "Humidity:  " + response.list[25].main.humidity + "%" + "</h3>");
        $(".tempFour").html("<h3>" + "Temp:  " + response.list[25].main.temp + "</h3>");
       

        $(".dateFive").html("<h3>" + response.list[33].dt_txt + "</h3>");
        $(".humidityFive").html("<h3>" + "Humidity:  " + response.list[33].main.humidity + "%" + "</h3>");
        $(".tempFive").html("<h3>" + "Temp:  " + response.list[33].main.temp + "</h3>");
      
    });
  });

  