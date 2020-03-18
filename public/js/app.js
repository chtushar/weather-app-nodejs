const form = document.querySelector("form");
const search = form.querySelector("input");
const report = document.querySelector(".report");
const loc = document.querySelector(".location");
const outputPrimary = document.querySelector(".output-primary");
const outputSecondary = document.querySelector(".output-secondary");

form.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  const path = `/weather?address=${location}`;

  fetch(path).then(response => {
    response.json().then(data => {
      if (data.error) {
        outputPrimary.innerHTML="";
        outputSecondary.innerHTML = "";
        loc.innerHTML = "";
        loc.innerHTML = data.error;
      } else {
        //let loc = data.location.split(',')[0];
        loc.innerHTML = "";
        loc.innerHTML = `<img src="/img/location-point.svg"/>
                              <p class="location-text">${data.location.split(',')[0]}</p>`;
        outputPrimary.innerHTML = "";
        outputSecondary.innerHTML = "";
        outputPrimary.innerHTML = `<div class="temperature">${data.forecast.temperature.toPrecision(3)}<sup>&#8451;</sup></div>
                                   <div class="forecast"><img src="/img/icons/${data.forecast.icon}.svg"/></div>`;
        outputSecondary.innerHTML = `<div class="rain-prob">Rain Probability ${100*data.forecast.precipProbability.toPrecision(4)}%</div>
                                     <div class="wind-speed">Wind speed ${data.forecast.windSpeed} kmph</div>`;
        
      }
    });
  });
});
