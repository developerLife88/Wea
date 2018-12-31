// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
       $$('.page').css('background', 'url("img/fog.jpg") no-repeat center center fixed');
    $$('.page').css('background-size', 'cover');       
   $$('.layer').css('background', 'rgba(12, 4, 31, 0.7)').css('height', '100%');
    
    getWeather();
  
});
/*-----------------------------------*/



function getWeather(){
  var location = getLocation();

  var city = location.city;
  var state = location.state;

   $.ajax({
   method:'GET',  /*---e069d13c9432ad2f --*/ /*---62d0e72f66a7de1a --*/
url:'http://api.wunderground.com/api/62d0e72f66a7de1a/conditions/q/'+state+'/'+city+'.json',
		dataType:'jsonp',
      success: function(result){
          fetch_WU(result);
      }
  });
} /*--------- end of getWeather function ---------*/

 

function getLocation(){
  var init_loc;
  if(localStorage.getItem('searchlocation') === null){
    init_loc = {city:'Victoria', state:'British Columbia'};
  } else {
    init_loc = JSON.parse(localStorage.getItem('searchlocation'));
  }

  return init_loc;
}

/*---------------------------------------*/

/*-------------------city page ---------------------------*/
myApp.onPageInit('city', function (page) {
   // $('#city').val(getLocation().city);
  //  $('#state').val(getLocation().state);
    
    
   $('#searchForm').on('submit', function(e){
     var search = {
      city: $('#city').val(),
      state: $('#state').val()
    };
    /*------Save---------*/
    saveSearch(search);
       
    e.preventDefault();

  });
    
    
    
    
$$('.page').css('background', 'url("img/fog.jpg") no-repeat center center fixed');
    $$('.page').css('background-size', 'cover');       
   $$('.layer').css('background', 'rgba(12, 4, 31, 0.7)').css('height', '100%');
    /*---make sure you add a layer class in city page ---*/
})


myApp.onPageInit('info', function (page) {
   // $('#city').val(getLocation().city);
  //  $('#state').val(getLocation().state);
   
$$('.page').css('background', 'url("img/fog.jpg") no-repeat center center fixed');
    $$('.page').css('background-size', 'cover');       
   $$('.layer').css('background', 'rgba(12, 4, 31, 0.7)').css('height', '100%');
    /*---make sure you add a layer class in city page ---*/
})
/*-----------------------------------------------------*/


function saveSearch(search){
 console.log(search);
    

   var search_loc = {
      city:search.city,
      state: search.state
    }

    localStorage.setItem('searchlocation', JSON.stringify(search_loc));
     window.location.href='index.html'; 
}
/*-----------------------------------------*/


 /*-------------------------------------------------*/  
      function fetch_WU(result){
    var weather = result.current_observation;
    var iconurl = 'icons/' + weather.icon + '.png';
    var weatherIcon = `
      <img src="${iconurl}">
      <h3>${weather.weather}</h3>
      <h2>${weather.temp_c} &#8451;<h2>       <h2>${weather.display_location.full}</h2>
    `;
    $('#weather_icon').html(weatherIcon );

          
          
    var weatherList = `

    <div class="row no-gutter">
    <div class="col-33"><br><i class="fas fa-thermometer-half"></i><br>Temp<br> ${weather.temp_f} F</div>
    <div class="col-33"><br><i class="fas fa-sort-amount-down"></i><br>Dew Point<br>${weather.dewpoint_c} &#8451;</div>    
 <div class="col-33"><i class="wu wu-fog wu-solid-white wu-day wu-32" data-name="fog"></i><br>Wind Speed<br> ${weather.wind_kph} /kph</div>
</div>
<br>
   <div class="row no-gutter">
    <div class="col-33"> <i class="fas fa-braille"></i><br>Humidity<br> ${weather.relative_humidity}</div>
    <div class="col-33"><i class="fas fa-thermometer-empty"></i><br>Feels Like<br> ${weather.feelslike_c} &#8451;</div>
    <div class="col-33"><i class="fas fa-glasses"></i><br>Visibility<br>${weather.visibility_mi} Miles</div> 
    </div> 
    `;

    $('#weatherList').html(weatherList);

}
/*---------------------------------------------*/

   
