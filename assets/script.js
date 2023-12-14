
//*API Key
const apiKey="f21cc0f07b0a0a4530a7ef4fdd7b13bf";


//*Setting up search button to receive data from API
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


//*Displays current weather data for input city
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

//* Displays 5 day forecast for input city
function dayForecast(forecast){
    document.querySelector('.weekF').innerHTML=''
    //*Loop to display 5 day forecast
    for (let i = 7; i < forecast.list.length; i+=7) {
        console.log(forecast.list[i]);
        let div= document.createElement('div');
        div.setAttribute('class','dayF');
    //*Displays date, temperature, humidity, windspeed, and icon for each day  
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

//*Saves search history to local storage
function saveSearch () {
    let inputVal = document.getElementById('input').value;
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(inputVal);
    localStorage.setItem('searches', JSON.stringify(searches));

    let recentSearch = document.querySelector('.recentSearch');
    recentSearch.innerHTML = '';
    searches.forEach(search =>{
        let newElement= document.createElement('button');
        newElement.textContent = search;
        recentSearch.appendChild(newElement);

    })

}




//*event listeners
searchButton.addEventListener('click', function() {
    saveSearch();
    searchByCity();
    dayForecast();
});

let recentSearch = document.querySelector('.recentSearch');
//*searches by city when recent search is clicked
recentSearch.addEventListener('click', function(event) {
    console.log(event.target.textContent);
    document.getElementById('input').value = event.target.textContent;
    searchByCity();
    dayForecast();
});

//*displays recent searches when page is loaded
function displaySearches() {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    let recentSearch = document.querySelector('.recentSearch');
    recentSearch.innerHTML = '';
    searches.forEach(search =>{
        let newElement= document.createElement('button');
        newElement.textContent = search;
        recentSearch.appendChild(newElement);

    })
}

window.onload = displaySearches();

