const tem= document.querySelector(".js-temp");
const pla= document.querySelector(".js-place");
const API_KEY = 'your key';
const COORDS = 'coords';

// api 위도 경도로 날씨와 장소 받아오기
function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json();
        }).then(function(json){
            const temperture = json.main.temp;
            const place = json.name;
            tem.innerText = `${temperture}°`;
            pla.innerText = place;
        });
}

// 위도 경도 저장하기
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 위도경도 저장하고, 날씨 가져오기
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, latitude);
}


function handleGeoFail(positon){
    console.log('Cant access geo location');
}


function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoFail);
}

// 위치정보 불러오기
function loadCoords(){
    const loadCoords = localStorage.getItem(COORDS);
    
    if(loadCoords === null){
        askForCoords();
    }else {
      
        const parseCoords = JSON.parse(loadCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();