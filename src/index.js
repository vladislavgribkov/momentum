import './style.scss';
import DateMomentum from './classes/date';
import Person from './classes/person';
import Images from './classes/images';
import "regenerator-runtime/runtime";



const name = document.querySelector('.content__items_person-name_name'),
  focus = document.querySelector('.content__items_person-target_edit'),
  time = document.querySelector('.content__items_date-time'),
  today = document.querySelector('.content__items_date-date'),
  hello = document.querySelector('.content__items_person-name_hello'),
  refresh = document.querySelector('.refresh'),
  quote = document.querySelector('.content__quote-text'),
  quoteRefreshBtn = document.querySelector('.content__quote-btn'),
  city = document.querySelector('.city'),
  weather = document.querySelector('.content__items_weather-weather');
  
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');

  const dateMomentum = new DateMomentum();
  const person = new Person();
  const images = new Images();
  


  today.innerHTML = dateMomentum.getDate();
  hello.innerHTML = `Good ${dateMomentum.getTimesOfDay()} ,`;
  name.innerHTML = person.getPerson();
  focus.innerHTML = person.getFocus();
  city.innerHTML = person.getCity();
  getWeather(person.getCity());
  document.body.style = `background: url("/src/assets/images${images.getFirstImage(dateMomentum.getTimesOfDay())}")`;

  setInterval(()=>{
    time.innerHTML = dateMomentum.getTime();
    if(dateMomentum.checkNewDay()){
      today.innerHTML = dateMomentum.getDate();
    }
    if(dateMomentum.checkMinutesAndSeconds()){
      hello.innerHTML = `Good ${dateMomentum.getTimesOfDay()} ,`;
      document.body.style = `background: url("/src/assets/images${images.getFirstImage(dateMomentum.getTimesOfDay())}")`;
    }
  },1000);

  async function getQuote() {
    const url = 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
    const res = await fetch(url);
    const data = await res.json();
    quote.innerHTML = `${data.quoteText} &copy; ${data.quoteAuthor}`
  }
  // Set Name
  let setName = (e) =>{
    if (e.type === 'keypress') {
      if (e.which == 13 || e.keyCode == 13) {
        addName(e);
      }
    } else {
      addName(e);
    }
  }

  let addName = (e) => {
    if(e.target.innerText.trim() !== ''){
      person.setPerson(e.target.innerText);
      name.blur();
    }else{
      name.innerHTML = person.getPerson();
      name.blur();
    }
  }

  // Set Focus
  let setFocus = (e) =>{
    if (e.type === 'keypress') {
      if (e.which == 13 || e.keyCode == 13) {
        addFocus(e);
      }
    } else {
      addFocus(e);
    }
  }

  let addFocus = (e) => {
    if(e.target.innerText.trim() !== ''){
      person.setFocus(e.target.innerText);
      focus.blur();
    }else{
      focus.innerHTML = person.getFocus();
      focus.blur();
    }
  }

  let count = 1;
  let day = dateMomentum.getTimesOfDay();
  let setRefresh = (e) =>{
    if(count === 5){
      count = 0;
      let a = dateMomentum.twentyFourHours.filter(element =>{
        return element.time === day;
      })
      day = a[0].next;
    }
    refresh.disabled = true;
    document.body.style = `background: url("/src/assets/images${images.getFirstImage(day)}")`;
    setTimeout(()=>{
      refresh.disabled = false;
    },1000);
    count++;
  }

  // Set City
  let setCity = (e) =>{
    if (e.type === 'keypress') {
      if (e.which == 13 || e.keyCode == 13) {
        addCity(e);
      }
    } else {
      addCity(e);
    }
  }

  let addCity = (e) => {
    if(e.target.innerText.trim() !== ''){
      person.setCity(e.target.innerText);
      getWeather(e.target.innerText);
      city.blur();
    }else{
      city.innerHTML = person.getCity();
      getWeather(person.getCity());
      city.blur();
    }
  }

  async function getWeather(city) {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&
    lang=en&appid=d83ab80ee35b01325a8da58fdb648777&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 
    console.log(data)
    if(data.cod === '404'){
      weatherIcon.removeAttribute('class');
      weatherIcon.classList = 'weather-icon owf';
      temperature.textContent = `City not found`;
      weatherDescription.textContent = '';
    }else{
      console.log('tut')
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${data.main.temp}°C`;
      weatherDescription.textContent = data.weather[0].description;
    }
    // console.log();
  }
  
  name.addEventListener('keypress', setName);
  name.addEventListener('blur', setName);
  city.addEventListener('keypress', setCity);
  city.addEventListener('blur', setCity);
  focus.addEventListener('keypress', setFocus);
  focus.addEventListener('blur', setFocus);
  refresh.addEventListener('click',setRefresh);
  document.addEventListener('DOMContentLoaded', getQuote);
  quoteRefreshBtn.addEventListener('click', getQuote);