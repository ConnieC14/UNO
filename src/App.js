// Previously called CardSorter
import React, { Component } from 'react';
import { v4 } from 'uuid';

/** COMPONENTS **/
import UNOHeader from "./components/UNOHeader";
import DeckSorter from "./components/DeckSorter";
import CreateCardView from "./components/CreateCard";
import FilterDeck from "./components/FilterDeck";
import CardHolder from "./components/CardHolder";

/** VIEWS **/
import Instructions from "./views/Instructions";

/** STYLING **/
import Provider from '@react/react-spectrum/Provider';
import Style from "./style/UNO.scss";

/** ANIMATION **/

/** APP **/
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [ 
            { id: v4(), number: 2, color: 'red', isSpecial: false, specialAct: '' },
            { id: v4(), number: -1, color: 'green', isSpecial: true, specialAct: 'reverse' },
            { id: v4(), number: 1, color: 'blue', isSpecial: false, specialAct: '' },
            { id: v4(), number: -1, color: 'wild', isSpecial: true, specialAct: 'draw-four' },
            { id: v4(), number: 6, color: 'yellow', isSpecial: false, specialAct: '' }
            ], 
            filter: "all",
            order: ""
        };

       

        this.handleCardRemove = this.handleCardRemove.bind(this);
        this.handleCardSort = this.handleCardSort.bind(this);
        this.handleApplyFilter = this.handleApplyFilter.bind(this);
        this.handleCardCreate = this.handleCardCreate.bind(this);

        this.getCardName = this.getCardName.bind(this);
        this.lessThan = this.lessThan.bind(this);
        this.left = this.left.bind(this);
        this.right = this.right.bind(this);
        this.merge = this.merge.bind(this);
        this.mergesort = this.mergesort.bind(this);
        this.sortCards = this.sortCards.bind(this);
    }

    /** HELPER METHODS **/
    getCardName(card) {
        if (card.number > -1) {
            return "" + card.number;
        }
        return "" + card.specialAct;
    }

    lessThan(left, right, whatOrder) {
        if (!(right == undefined)) {
            switch(whatOrder) {
                case 'alphabetical':
                    if (this.getCardName(left) < this.getCardName(right)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                break;
                case 'color':
                    if (left.color < right.color) {
                        return true;
                    }
                    else { 
                        return false;
                    }
                break;
            }
        }
    }

    /** SORTING METHODS **/
    left(leftCards) {
        let temp = []; // FIND OTHER TYPE OF ARRAY
        let half = Math.floor(leftCards.length/2);

        for(var i = 0; i < half; i++) {
            temp.push(leftCards[i]);
        }

        return temp;
    }

    right(rightCards) {
        let temp = [];
        let half = Math.floor(rightCards.length/2);

        for(var i = half; i < rightCards.length; i++) {
            temp.push(rightCards[i]);
        }

        return temp;
    }

    merge(cardDeck, left, right, whatOrder) {
        let i = 0; // left tracker
        let j = 0; // right tracker
        let k = 0;

        while(k < cardDeck.length) {
            if (( (i < left.length) && this.lessThan(left[i], right[j], whatOrder)) || !(j < (right.length))) {
                cardDeck[k] = left[i];           
                i++;
            }

            else {
                cardDeck[k] = right[j]; 
                j++;
            }
            k++;
        }
        return cardDeck;
    }

    mergesort(cardDeck, whatOrder) {
        if (cardDeck.length > 1) {
            let Left = this.left(cardDeck);
            let Right = this.right(cardDeck);

            this.mergesort(Left, whatOrder);
            this.mergesort(Right, whatOrder);

            return this.merge(cardDeck, Left, Right, whatOrder);
        }
    }

    sortCards(cards, whichSort, whatOrder) {
        switch(whichSort) {
            case 'merge':
                // console.log("List of Cards: " + this.printCard(cards));
                let sortedcards = this.mergesort(cards, whatOrder);

                return sortedcards;

            break;
        }

        return null;
    }

    printCard(cards) {
        return JSON.stringify(cards, null, 4);
    }

    printState() {
        return JSON.stringify(this.state, null, 4);
    }

    /** EVENT HANDLERS **/
    handleCardRemove(card_id) {
        let newCardState = this.state.cards.filter(card => {
          return card.id !== card_id;
        });

        this.setState({
            cards: newCardState
        });
    }

    handleCardSort(whichSort, whatOrder) {
        let sortedcards = this.sortCards(this.state.cards, whichSort, whatOrder);

        if (sortedcards != null) {
            this.setState({
                cards: sortedcards,
                order: whatOrder
            });
        }
    }

    handleApplyFilter(filter) {
        console.log("handling filter change: " + String(filter));
        this.setState({
            filter: filter
        });
    }

    handleCardCreate(card) {    
        let newcard = {
            id: v4(),
            number: card.number,
            color: card.color,
            isSpecial: card.isCardSpecial,
            specialAct: card.specialAct
        };

        this.setState( (prevState) => ({
            cards: prevState.cards.concat([newcard])
        }));
    }
    
// <div className="App">
    render() {
        return ( 
            <Provider theme="dark" className={ Style.container }>
                <UNOHeader />
                <div className="App-body">
                    <div className="Instructions"> 
                        <Instructions />
                    </div>
                    
                    <div className="App-Game">
                        <h3>Current Card Being Played</h3>
                        <img src={ require('./cards/UNO.png') } height={ 200 }/>
                    </div>

                    <div className="Actions"> 
                        <div className="Create-Card-Holder"> 
                            <h3>Create a Card</h3>
                            <CreateCardView onCardCreate={ this.handleCardCreate } />
                        </div>
                        <div className="Filter-Deck">
                            <h3>Filter Your Deck</h3>
                            <FilterDeck onApplyFilter={ this.handleApplyFilter } />
                        </div>
                        <div className="Sort-Card">
                            <h3>Sort Your Cards</h3>
                            <DeckSorter deck={ this.state } onCardSort={ this.handleCardSort }/>
                        </div>
                    </div>

                    <div className="Card-Holder">
                        <h3>UNO Cards</h3>
                        <CardHolder deck={ this.state.cards } filter={ this.state.filter } onCardRemove={ this.handleCardRemove } />
                    </div>
                </div>
                <div className="App-footer">
                    <h2 className="remaining-cards">
                    UNO Cards Remaining: <strong>{ this.state.cards.length } </strong>
                    </h2> 
                </div>
            </Provider>
        );
    }
}

export default App;
