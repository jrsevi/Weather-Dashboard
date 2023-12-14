const apiKey="f21cc0f07b0a0a4530a7ef4fdd7b13bf";

function searchByCity(){
    var city= document.getElementById('input').value;
    var urlSearch= `http://api.openweathermap.org/data/2.5/weather?q=${city}&` + `appid=${apiKey}`;

    fetch(urlSearch).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        weatherData(data);

        var lat= data.coord.lat;
        var lon= data.coord.lon;
        var urlForecast= `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        fetch(urlForecast).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            dayForecast(data);
        })
    })
    document.getElementById('input').value = "";
    
    
}



function weatherData(data){
    var city= data.name;
    var temp=data.main.temp;
    var tempCelsius= Math.round(temp - 273.15);
    var tempFahrenheit= Math.round((temp - 273.15) * 9/5 + 32);
    var wind= data.wind.speed;
    var humidity= data.main.humidity;
    var date= new Date().toDateString(undefined,'Asia/Kolkata');
    
    let icon1= data.weather[0].icon;
    let icon1Url = "http://openweathermap.org/img/wn/" + icon1 + "@2x.png";
    document.getElementById('img').src= icon1Url;


    document.getElementById('city').innerHTML = city + " " + date;
    document.getElementById('temp').innerHTML = "Temperature: " + tempFahrenheit + "°F";
    document.getElementById('wind').innerHTML = "Windspeed: " + wind;
    document.getElementById('humidity').innerHTML = "Humidity: " + humidity;
    
    

}

function dayForecast(forecast){
    document.querySelector('.weekF').innerHTML=''
    for (let i = 7; i < forecast.list.length; i+=7) {
        console.log(forecast.list[i]);
        let div= document.createElement('div');
        div.setAttribute('class','dayF');
        
        let day= document.createElement('p');
        day.setAttribute('class','date')
        day.innerText= new Date(forecast.list[i].dt * 1000).toDateString(undefined,'Asia/Kolkata');
        div.appendChild(day);

        let temp= document.createElement('p');
        temp.innerText= Math.floor((forecast.list[i].main.temp_max - 273) * 9/5 + 32)+ ' °F';
        div.appendChild(temp)

        let humidity= document.createElement('p');
        humidity.innerText= forecast.list[i].main.humidity + '%';
        div.appendChild(humidity);

        let wind= document.createElement('p');
        wind.innerText= forecast.list[i].wind.speed + ' mph';
        div.appendChild(wind);

        let icon= forecast.list[i].weather[0].icon;
        let iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
        let img= document.createElement('img');
        img.setAttribute('src',iconUrl);
        div.appendChild(img);


        document.querySelector('.weekF').appendChild(div)
    }
}





let searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', function() {
    searchByCity();
    dayForecast();
});

