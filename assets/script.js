const apiKey="f21cc0f07b0a0a4530a7ef4fdd7b13bf";

function searchCity(){
    var city= document.getElementById('input').ariaValueMax;
    var urlSearch= `http://api.openweathermap.org/data/2.5/weather?q=${city}&` + `appid=${apiKey}`;

    fetch(urlSearch).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        weatherData(data);
    })
    document.getElementById('input').value = "";
    
}

function weatherData(data){
    var city= data.name;
    var temp= data.main.temp;
    var tempCelsius= Math.round(temp - 273.15);
    var tempFahrenheit= Math.round((temp - 273.15) * 9/5 + 32);
    var wind= data.wind[0].main;
    var weatherDescription= data.weather[0].description;
    var icon= data.weather[0].icon;

    document.getElementById('city').innerHTML = city;
    document.getElementById('temp').innerHTML = tempCelsius + "°C";
    document.getElementById('wind').innerHTML = wind;
    document.getElementById('humidity').innerHTML = humidity;
    document.getElementById('weatherDescription').innerHTML = weatherDescription;
    document.getElementById('img').src = "http://openweathermap.org/img/w/" + icon + ".png";
}

function weekForecast (weekForecast) {
    document.querySelector(".weekForecast").innerHTML = "";
    for (let i = 8; i < weekForecast.length; i += 8) {
        console.log(weekForecast.list[i]);
         let div = document.createElement("div");
         div.setAttribute("class", "day");

         let day = document.createElement('p');
         day.setAttribute("class", "date");
         day.innerText = new Date(forecast.list[i].dt*1000)toDateString(undefined, "Asia/Kolkata");
         div.appendChild(day);

         let temp = document.createElement('p');
         temp.innerText = Math.floor(forecast.list[i].main.temp - 273.15) + "°C";
            div.appendChild(temp);
        
        let wind= document.createElement('p');
        wind.innerText = forecast.list[i].wind.speed + "m/s";
        div.appendChild(wind);

        let humidity= document.createElement('p');
        humidity.innerText = forecast.list[i].main.humidity + "%";
        div.appendChild(humidity);

        let img= document.createElement('img');
        img.src = "http://openweathermap.org/img/w/" + forecast.list[i].weather[0].icon + ".png";
        div.appendChild(img);
        
    }
}


