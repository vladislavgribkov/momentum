import './style.scss';
import DateMomentum from './classes/date';
import Person from './classes/person';
import Images from './classes/images';
import "regenerator-runtime/runtime";
import './assets/style/owfont-regular.css';


const name = document.querySelector('.content__items_person-name_name'),
  focus = document.querySelector('.content__items_person-target_edit'),
  time = document.querySelector('.content__items_date-time'),
  today = document.querySelector('.content__items_date-date'),
  hello = document.querySelector('.content__items_person-name_hello'),
  refresh = document.querySelector('.refresh'),
  quote = document.querySelector('.content__quote-text'),
  quoteRefreshBtn = document.querySelector('.content__quote-btn'),
  city = document.querySelector('.city'),
  popup = document.querySelector('.popup'),
  popupText = document.querySelector('.popup__content_text-text');
  
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');
  const weatherHumidity = document.querySelector('.weather-humidity');
  const weatherSpeed = document.querySelector('.weather-speed');

  const dateMomentum = new DateMomentum();
  const person = new Person();
  const images = new Images();
  


  today.innerHTML = dateMomentum.getDate();
  hello.innerHTML = `Good ${dateMomentum.getTimesOfDay()} ,`;
  name.innerHTML = person.getPerson();
  focus.innerHTML = person.getFocus();
  city.innerHTML = person.getCity();

  document.body.style.backgroundImage = `url("./src/assets/images${images.getFirstImage(dateMomentum.getTimesOfDay())}")`;
  images.location = `${dateMomentum.getTimesOfDay()}`;

  setInterval(()=>{
    time.innerHTML = dateMomentum.getTime();
    if(dateMomentum.checkNewDay()){
      today.innerHTML = dateMomentum.getDate();
    }
    if(dateMomentum.checkMinutesAndSeconds()){
      hello.innerHTML = `Good ${dateMomentum.getTimesOfDay()} ,`;
      let src = `./src/assets/images${images.getFirstImage(dateMomentum.getTimesOfDay())}`;
      images.location = `${dateMomentum.getTimesOfDay()}`;
      const img = document.createElement('img');
      img.src = src;
      img.onload = () => {    
        document.body.style.backgroundImage = `url("${src}")`;
      }; 
    }
  },1000);
  
  let quoteLastText = '';

  // Set Name
  let setName = (e) =>{
    if (e.type === 'keypress') {
      if (e.which == 13 || e.keyCode == 13) {
        addName(e);
      }
    } else {
      name.innerHTML = person.getPerson();
      name.blur();
    }
  }

  let addName = (e) => {
    if(e.target.innerText.trim() !== ''){
      person.setPerson(e.target.innerText.trim());
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
      focus.innerHTML = person.getFocus();
      city.blur();
    }
  }

  let addFocus = (e) => {
    if(e.target.innerText.trim() !== ''){
      person.setFocus(e.target.innerText.trim());
      focus.blur();
    }else{
      focus.innerHTML = person.getFocus();
      focus.blur();
    }
  }

  let count = 1;
  let day = dateMomentum.getTimesOfDay();

  let setRefresh = (e) =>{
    document.querySelector('.next').style.display = 'none';
    if(count === 4){
      let a = dateMomentum.twentyFourHours.filter(element =>{
        return element.time === day;
      })
      images.location = `${a[0].next}`;
      console.log('444')
    }
    if(count === 5){
      count = 0;
      let a = dateMomentum.twentyFourHours.filter(element =>{
        return element.time === day;
      })
      day = a[0].next;
    }
    let src = `./src/assets/images${images.getFirstImage(day)}`;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {    
      document.body.style.backgroundImage = `url("${src}")`;
    }; 
    count++;
    refresh.disabled = true;
    setTimeout(()=>{
      refresh.disabled = false;
    },1000);
  }

  // Set City
  let setCity = (e) =>{
    if (e.type === 'keypress') {
      if (e.which == 13 || e.keyCode == 13) {
        addCity(e);
      }
    }else{
      city.innerHTML = person.getCity();
      city.blur();
    }
  }


  let addCity = (e) => {
    if(e.target.innerText.trim() !== ''){
      getWeather(e.target.innerText.trim());
      person.setCity(e.target.innerText.trim());
      city.blur();
    }else{
      city.innerHTML = person.getCity();
      getWeather(person.getCity());
      city.blur();
    }
  }

  async function getWeather(cityN) {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityN}&
    lang=en&appid=d83ab80ee35b01325a8da58fdb648777&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if(data.cod === '404'){
      city.innerHTML = person.getLastCity();
      person.setCity(person.getLastCity());
      person.setLastCity(person.getLastCity());
      popup.style.display = 'flex';
      popupText.innerHTML = 'City not found';
    }else{
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      weatherDescription.textContent = `${data.weather[0].description}`;
      temperature.textContent = `${data.main.temp}°C`;
      weatherHumidity.textContent = `Humidity: ${data.main.humidity}%`;
      weatherSpeed.textContent = `Wind: ${data.wind.speed}m/s`;
    }
  }

  async function getQuote() {
    rotateBtn();
    try{
      const url = 'https://favqs.com/api/qotd';
      const res = await fetch(url);
      const data = await res.json();
      if(quoteLastText!==data.quote.body){
        quote.innerHTML = `${data.quote.body} &copy; ${data.quote.author}`;
        quoteLastText = data.quote.body;
      }else{
        getQuote();
      }
    }catch(e){
      popup.style.display = 'flex';
      popupText.innerHTML = 'The quote server is overloaded. Try later.';
       console.log("Превышен лимит запросов к серверу");
    }
  }

  let rotateBtn = () =>{
    quoteRefreshBtn.style.transform = 'rotate(360deg)';
    quoteRefreshBtn.style.transition = ' transform 1s';
    setTimeout(()=>{
      quoteRefreshBtn.style.transition = '';
      quoteRefreshBtn.style.transform = 'rotate(0)';
    },1000)
  }
  name.addEventListener('keypress', setName);
  name.addEventListener('blur', setName);
  name.addEventListener('click', ()=>{
    name.innerHTML =  '&nbsp;';
  });
  city.addEventListener('keypress', setCity);
  city.addEventListener('blur', setCity);
  city.addEventListener('click', ()=>{
    city.innerHTML =  '&nbsp;';
  });
  focus.addEventListener('keypress', setFocus);
  focus.addEventListener('blur', setFocus);
  focus.addEventListener('click', ()=>{
    focus.innerHTML =  '&nbsp;';
  });
  
  refresh.addEventListener('click',setRefresh);
  refresh.onmouseover = ()=>{
    if(document.documentElement.clientWidth > 1199){
      document.querySelector('.next').style.display = 'block';
      document.querySelector('.nextImage').setAttribute('src', `./src/assets/images/${images.location}/${images.arrayImages[0]}`);
    }
  }
  refresh.onmouseout = ()=>{
    if(document.documentElement.clientWidth > 1199){
      document.querySelector('.next').style.display = 'none';
    }
  }
  document.addEventListener('DOMContentLoaded', getQuote());
  document.addEventListener('DOMContentLoaded',   getWeather(person.getCity()));
  quoteRefreshBtn.addEventListener('click', getQuote);

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup')|| event.target.closest('.popup__content_button')){
        popup.style.display = 'none';
    }
});
window.onresize = function() {
  document.location.reload();
};