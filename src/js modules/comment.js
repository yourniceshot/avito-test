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

