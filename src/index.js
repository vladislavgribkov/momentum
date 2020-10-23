import './style.scss'
import DateMomentum from './classes/date'


new DateMomentum();
setInterval(()=>{
  console.log(DateMomentum.getTime())
},1000)
