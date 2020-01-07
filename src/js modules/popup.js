import {pictureList} from './cards.js';
const commentPopup = document.querySelector('.popup-mask');
import {CommentList} from "./commentlist.js";
import {commentContainer} from "./comment.js";

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
        commentContainer.innerHTML = '';

        const linkValue = target.style.backgroundImage;
        const popupImage = document.querySelector('.popup__photo');
        const linkValueFormatted = linkValue.slice(linkValue.indexOf('url') + 5, -2);
        popupImage.setAttribute('src', linkValueFormatted);

        let commentList;
        const imageId = linkValue.slice(30, -10);
        fetch(`https://boiling-refuge-66454.herokuapp.com/images/${imageId}`)
        .then(res => res.json())
        .then((data)=> {
            commentList = new CommentList(commentContainer, data);
        })
        .catch((err) => {
            console.log(err);
        })

        document.forms.form.addEventListener('submit', function(event) {
            event.preventDefault();
            const form = document.forms.form;
            const comment = form.elements.comment;
            const name = form.elements.name;
            const getDate = new Date();
            const year = getDate.getFullYear();
            const month = getDate.getMonth();
            const date = getDate.getDate();
            const finalDate = `${date}.${month + 1}.${year}`;

            fetch(`https://boiling-refuge-66454.herokuapp.com/images/${imageId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                comment: comment.value,
                date: getDate
            })
            })
            .then(()=> {
                commentList.addComment(finalDate, comment.value);
                form.reset();
            })
            .catch((err) => {
                console.log(err);
            })
        })
    }
})