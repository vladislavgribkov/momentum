
export default class DateMomentum{
    
    constructor(){
        this.now = new Date();
        this.twentyFourHours = [{time: 'morning', next: 'afternoon'},{time: 'afternoon', next: 'evening'},
        {time: 'evening', next: 'night'},{time: 'night', next: 'morning'}]
    }

    getDate(){
        let date = new Date();
        let month = date.toLocaleString('en-US', {
            day: 'numeric',
            month: 'long'
        });
        let weekDay = date.toLocaleString('en-US', {
            weekday: 'long'
        });
       
        return `${month}, ${weekDay}` 
    }

    getTime(){
        let date = new Date();
        let time = date.toLocaleString('en-GB', {
            hour:  'numeric',
            minute: 'numeric',
            second: 'numeric'
        });
        return time;
    }
    
    getTimesOfDay(){
        let date = new Date();
        let time = date.getHours();
        let timesOfDay;

        if(time > 5 && time <= 11){
            timesOfDay = 'morning';
        }
        if(time > 11 && time <= 17){
            timesOfDay = 'afternoon';
        }
        if(time > 17 && time <= 23){
            timesOfDay = 'evening';
        }
        if( time > -1  && time <= 5){
            timesOfDay = 'night';
        }
        return timesOfDay;
    }

    checkNewDay(){
        if(this.now.getDate() !== new Date().getDate()){
            return true;
        }
        return false;
    }

    checkMinutesAndSeconds(){
        let data = new Date();
        if(data.getMinutes() === 0 && data.getSeconds() === 0){
            return true;
        }
        return false;
    }
}