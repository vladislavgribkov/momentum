
export default class DateMomentum{
    static date;
    static map = new Map(); 

    constructor(){
        this.setKeyAndValueInMap();
        this.getDateObject();
    }

    getDateObject(){
        DateMomentum.date = new Date();
        setInterval(this.getDateObject, 1000);
    }
    
    static getDate(){
        let month = DateMomentum.date.toLocaleString('en-US', {
            month: 'long'
        });
        let weekDay = DateMomentum.date.toLocaleString('en-US', {
            weekday: 'long'
        });
        let day = DateMomentum.date.getDay();
        return `${weekDay}, ${day} ${month}` 
    }

    static getTime(){
        let time = DateMomentum.date.toLocaleString('en-GB', {
            hour:  'numeric',
            minute: 'numeric',
            second: 'numeric'
        });
        return time;
    }
    
    static getTimesOfDay(){
        let time = Number(DateMomentum.date.toLocaleString('en-GB', {
            hour:  'numeric'
        }));
        let timesOfDay;

        if(time > 5 && time < 13){
            timesOfDay = 1;
        }
        if(time > 11 && time < 19){
            timesOfDay = 2;
        }
        if(time > 17 && time <= 23){
            timesOfDay = 3;
        }
        if(time === 24 || (time > 0  && time < 7)){
            timesOfDay = 4;
        }
        return timesOfDay;
    }

    static getNameTimesOfDay(number){
        return DateMomentum.map.get(number);
    }

    setKeyAndValueInMap(){
        DateMomentum.map.set(1, 'Morning'); 
        DateMomentum.map.set(2, 'Afternoon');
        DateMomentum.map.set(3, 'Evening');
        DateMomentum.map.set(4, 'Night');
    }
}