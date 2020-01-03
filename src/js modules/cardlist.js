import {Card} from "./cards.js";

export class CardList {
    constructor(container, cards) {
        this.container = container;
        this.cards = cards;
        this.render();
    }

    addCard(link) {
        const { cardElement } = new Card(link);
        this.container.appendChild(cardElement);
    }

    render(){
        this.cards.forEach((card) => {
            this.addCard(card.url);
        })
    }
}