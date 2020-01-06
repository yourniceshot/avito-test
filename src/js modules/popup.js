import {pictureList} from './cards.js';
const commentPopup = document.querySelector('.popup-mask');

export class Popup {
    constructor(popupElem, button) {
        this.popupElem = popupElem;
        this.button = button;
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.popupElem.querySelector('.popup__close').addEventListener('click', this.close);
        this.button.addEventListener('click', this.open);
    }

    open(){
        this.popupElem.style.display = "flex";
    }

    close(){
        this.popupElem.style.display = "none";
    }
}

pictureList.addEventListener('click', function (event){
    event.stopPropagation();
    const { target } = event;
    if (target.classList.contains('photo-grid__card')){
        const pictureButton = document.querySelector('.photo-grid__card');
        const popup = new Popup(commentPopup, pictureButton);
        popup.open();
        const linkValue = target.style.backgroundImage;
        const popupImage = document.querySelector('.popup__photo');
        const linkValueFormatted = linkValue.slice(linkValue.indexOf('url') + 5, -2);
        popupImage.setAttribute('src', linkValueFormatted);
    }
});