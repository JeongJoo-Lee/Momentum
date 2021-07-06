const clock = document.querySelector("h2#clock");

// 시계
function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock(); // 1초뒤에 실행되기 전에 바로 실행시켜야 하기때문에 선언
setInterval(getClock, 1000);
