
// Global Variables
var citiesList = [];
var lastCity = '';

// ========================Initial function to gets search history=======================
function int() {
    // Get the saved information from local storage
    var savedCities = JSON.parse(localStorage.getItem("citiesList"));

    $("<button>").html(savedCities);
 
    if (savedCities !== null) {
        citiesList = savedCities;
    }
    // Calls render buttons function to
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
    
//   -----------------------------Current Weather Information ajax--------------------------------
        // api query URL
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +city +"&appid=546de1fd66b329cf4085b588c55671b8";  
       
        console.log(queryURL);    
    // Current weather ajax
    $.ajax({
            url: queryURL,
            method: "GET"
         }).then(function(response) {
            // Displays current weather information data
            $(".currentCity").html("<h4>"  + response.name + "</h4>");
            $(".temperatureToday").html("<h4>" + "Temperature:  " + response.main.temp + "</h4>");
            $(".humidity").html("<h4>" + "Humidity: " + response.main.humidity + "</h4>");
            $(".windSpeed").html("<h4>" + "Wind Speed: " + response.wind.speed+ "</h4>");
            getUvIndex(response.coord.lat, response.coord.lon);
            // Displays weather icon
            $(".weatherIcon").html("<img src=http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png >");
            // modifies weather tags position
            $('h4').css({'margin': '5px', 'padding': '0', 'margin-left': '5px'});
           
    });

// -------------------------------Five Day Weather Information ajax----------------------------------
    // api query URL
    var queryURLThree = "https://api.openweathermap.org/data/2.5/forecast?q=" +city + "&appid=546de1fd66b329cf4085b588c55671b8";
    console.log(queryURLThree);       

    // Five day weather ajax function
    $.ajax({
        url: queryURLThree,
        method: "Get"
    }).then(function(response) {
        // Displays five weather information data
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


// =====================================UV Index Ajax Function========================================
function getUvIndex(lat, lon) {
    // api query url
    var queryURLTwo = " https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=546de1fd66b329cf4085b588c55671b8";
    // Uv index ajax
    $.ajax({
            url: queryURLTwo,
            method: "GET"
    }).then(function(response) {
            // Display UV Index number
            $(".colorWarning").html("<h4>" + response.current.uvi + "</h4>");
            // Displays UV Index color warning
            if(response.current.uvi < 2){
            $('.colorWarning').css({'color': 'green', 'display': 'inline-block'});
            }else if (response.current.uvi >2 && response.current.uvi <5){
                $('.colorWarning').css({'color': 'orange'});
            }else if (response.current.uvi > 5){
                $('.colorWarning').css({'color': 'red'});
            };
            $('span').css({'margin-left': '2px'});
            $('.uvIndex').css({'margin': '10px'});
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


// ========================Function to retrive weather information from saved buttons==================
$(document).on('click', '.savedCity', function() {
    
    var temporary = $(this).data('name');
    weatherInformation(temporary);

  });

  weatherInformation();