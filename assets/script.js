const apiKey="f21cc0f07b0a0a4530a7ef4fdd7b13bf";

function searchByCity(){
    var city= document.getElementById('input').value;
    var urlSearch= `http://api.openweathermap.org/data/2.5/weather?q=${city}&` + `appid=${apiKey}`;

    fetch(urlSearch).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        weatherData(data);
    })
    document.getElementById('input').value = "";
    





function weatherData(data){
    var city= data.name;
    var temp=data.main.temp;
    var tempCelsius= Math.round(temp - 273.15);
    var tempFahrenheit= Math.round((temp - 273.15) * 9/5 + 32);
    var wind= data.wind.speed;
    var humidity= data.main.humidity;
    
    let icon1= data.weather[0].icon;
    let icon1Url = "http://openweathermap.org/img/wn/" + icon1 + "@2x.png";
    document.getElementById('img').src= icon1Url;


    document.getElementById('city').innerHTML = city;
    document.getElementById('temp').innerHTML = "Temperature: " + tempFahrenheit + "°F";
    document.getElementById('wind').innerHTML = "Windspeed: " + wind;
    document.getElementById('humidity').innerHTML = "Humidity: " + humidity;
    
    

}
}
function dayForecast(forecast){
    document.querySelector('.weekF').innerHTML=''
    for (let i = 5; i < forecast.list.length; i+=5) {
        console.log(forecast.list[i]);
        let div= document.createElement('div');
        div.setAttribute('class','dayF');
        
        let day= document.createElement('p');
        day.setAttribute('class','date')
        day.innerText= new Date(forecast.list[i].dt*1000).toDateString(undefined,'Asia/Kolkata');
        div.appendChild(day);

        let temp= document.createElement('p');
        temp.innerText= Math.floor((forecast.list[i].main.temp_max - 273))+ ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273))+ ' °C';
        div.appendChild(temp)

        let description= document.createElement('p');
        description.setAttribute('class','desc')
        description.innerText= forecast.list[i].weather[0].description;
        div.appendChild(description);

        document.querySelector('.weekF').appendChild(div)
    }
}


let searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', function() {
    searchByCity();
    dayForecast();
});

