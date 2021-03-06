export default class Person{
    constructor(){
       this.checkPersonAndFocus();
    }

    checkPersonAndFocus(){
        if(localStorage.getItem('name') === null){
            localStorage.setItem('name','[enter name]');
        }
        if(localStorage.getItem('focus') === null){
            localStorage.setItem('focus','[enter focus]');
        }
        if(localStorage.getItem('city') === null){
            localStorage.setItem('city','Minsk');
        }
        if(localStorage.getItem('lastCity') === null){
            localStorage.setItem('lastCity','Minsk');
        }
    }

    getPerson(){
        return localStorage.getItem('name');
    }

    setPerson(name){    
        localStorage.setItem('name',name);
    }

    getFocus(){
        return localStorage.getItem('focus');
    }

    setFocus(focus){
        localStorage.setItem('focus', focus);
    }

    getCity(){
        return localStorage.getItem('city');
    }

    setCity(city){
        this.setLastCity(localStorage.getItem('city'));
        localStorage.setItem('city', city);
    }

    getLastCity(){
       return localStorage.getItem('lastCity');
    }
    setLastCity(city){
        localStorage.setItem('lastCity', city);
    }
}