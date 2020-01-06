import { api } from "./api.js";
import { CardList } from "./cardlist.js";
export const pictureList = document.querySelector('.photo-grid');

export class Card {
    constructor(link){
        this.cardElement = this.create(link);
    }

    create(linkValue){
        const imageCard = document.createElement('div');
        imageCard.classList.add('photo-grid__card');
        imageCard.style.backgroundImage = `url(${linkValue})`;

        return imageCard;
    }

}

let cardList;
api.getPictures()
.then((data) => {
    cardList = new CardList(pictureList, data);
}) 
.catch((err) => console.log(err));