import {Comment} from "./comment.js";
import {commentContainer} from "./comment.js";

export class CommentList {
    constructor(container, items) {
        this.container = container;
        this.items = items;
        this.addComment = this.addComment.bind(this);

        this.render();
    }

    addComment(date, text){
        const {commentElement} = new Comment(date, text);
        this.container.appendChild(commentElement);
    }

    render(){
        console.log(this.items);
            
        this.items.comments.forEach((comment) => {
            const dateToFormat = new Date(comment.date);
            const year = dateToFormat.getFullYear();
            const month = dateToFormat.getMonth();
            const date = dateToFormat.getDate();
            const finalDate = `${date}.${month + 1}.${year}`;

            this.addComment(finalDate, comment.text);
        })
    }
}

