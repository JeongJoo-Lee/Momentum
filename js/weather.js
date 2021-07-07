const API_KEY = "3549b0b54d0375e425d27c89077f570e";

function onGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      weather.innerText = `${res.weather[0].main} / ${Math.floor(
        res.main.temp
      )}도`;
      city.innerText = res.name;
    });
}

function onGeoError() {
  alert("위치를 확인할 수 없어 날씨 정보 제공이 제한됩니다.");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
