export default class Images{
    constructor(){
        this.arrayImages = this.getRandomImages();
        this.location = '';
    }
    
    getRandomImages(){
        let array = []
        for(let i = 1; i <= 20; i++){
            if(i < 10){
                array.push(`0${i}.jpg`);
            }else{
                array.push(`${i}.jpg`);
            }
        }
        return this.shuffle(array).splice(0,6);
    }

    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
        return array;
    }

    getFirstImage(location){
        let first = this.arrayImages.shift();
        this.arrayImages.push(first);
        return `/${location}/${first}`;
    }

    getAllImages(location){
        return `/${location}/${this.getFirstImage()}`;
    }
}