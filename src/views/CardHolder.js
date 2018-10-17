import React, { Component } from 'react';

import Style from "../style/CardHolder.scss";
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

export default class CardHolder extends Component {
    constructor(props) {
        super(props);

        console.log(props);

        this.handleRemoveCard = this.handleRemoveCard.bind(this);
        this.getCardName = this.getCardName.bind(this);
        this.filterCard = this.filterCard.bind(this);
    }

    handleRemoveCard(card_id) {
        if (typeof(this.props.onCardRemove) === 'function') {
            this.props.onCardRemove(card_id);
        }
    }

    importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    getCardName(card) {
        if (card.number > -1) {
            return "" + card.number;
        }
        return "" + card.specialAct;
    }

    filterCard(card, filter) {
        let condition = (filter === 'all' || (filter === 'red' && card.color === 'red') || (filter === 'green' && card.color === 'green') || (filter === 'blue' && card.color === 'blue') || (filter === 'wild' && card.color === 'wild') || (filter === 'yellow' && card.color === 'yellow'));
        if (condition) {
            return (
                <div>
                    <img src={ require('../cards/UNO_' + card.color + '_' + this.getCardName(card) +'.png') } height={ 300 }/>
                    <h3>{ this.getCardName(card) + " " + card.color }</h3>
                    <Button label="Remove" onClick={ () => this.handleRemoveCard(card.id) } variant="warning" />
                </div>
            );
        }

        return null;
    }

	render() {
        let filter = this.props.filter;

        /** let deck = this.props.deck.map( (card, index) => (
                <div key={ card.id } className="floating-card">
                    { this.filterCard(card, filter) }
                </div>
        ));**/

        return (
        <div className={ Style.container }>
            <TransitionGroup className="deck">
                { this.props.deck.map( (card, index) => (
                  <CSSTransition
                    key={card.id}
                    timeout={500}
                    classNames="fade"
                  >
                { this.filterCard(card, filter) }
                </CSSTransition>
                )) }
            </TransitionGroup>
        </div>
        );
    }
}
