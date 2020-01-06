import { api } from "./api.js";
import {CommentList} from "./commentlist.js"; 
export const commentContainer = document.querySelector('.popup__comment-block');

export class Comment {
    constructor(date, text){
        this.commentElement = this.create(date, text);
    }

    create(dateValue, textValue){
        const commentItem = document.createElement('div');
        commentItem.classList.add('popup__comment');
        commentItem.classList.add('comment');

        const commentDate = document.createElement('span');
        commentDate.classList.add('comment__date');
        commentDate.textContent = dateValue;

        const commentText = document.createElement('span');
        commentText.classList.add('comment__text');
        commentText.textContent = textValue;

        commentItem.appendChild(commentDate);
        commentItem.appendChild(commentText);

        return commentItem;
    }
}

let commentList;
api.getPictures()
.then((data) => {
    data.forEach((item) => {
        fetch(`https://boiling-refuge-66454.herokuapp.com/images/${item.id}`)
        .then(res => res.json())
        .then((data)=>{
            if (data.comments.length !== 0 && item.id === data.id) {
                commentList = new CommentList(commentContainer, data);
            }

        })
        .catch((err) => {
            console.log(err);
        })
    })
}) 
.catch((err) => console.log(err));

function newComment(event){
    event.preventDefault();
    const form = document.forms.form;
    const comment = form.elements.comment;
    const name = form.elements.name;
    const getDate = new Date();
    const year = getDate.getFullYear();
    const month = getDate.getMonth();
    const date = getDate.getDate();
    const finalDate = `${date}.${month + 1}.${year}`;

    api.getPictures()
    .then((data) => {
    data.forEach((item) => {
        fetch(`https://boiling-refuge-66454.herokuapp.com/images/${item.id}/comments`, {
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
        .catch((err) => {
            console.log(err);
        })
    })
})
.then(() => {
    commentList.addComment(finalDate, comment.value)
    form.reset();
})
.catch((err) => console.log(err));
}

document.forms.form.addEventListener('submit', newComment);