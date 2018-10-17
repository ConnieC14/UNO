
export default class CardController {
	constructor(props) {
		// super(props);
		// this.state = props;
		// console.log(this.state);
		this.state = {
			cards: props.cards
		}

        // this.setState((prevState, props) => {
  		// return {counter: prevState.counter + props.step};
		// });

	}

	get getCards() {
		return this.state.cards;
	}

	get countRemainingCards() {
		this.state.cards.filter((cards) => cards).length;
	}

	cardNumber() {
		var numbList = [];
		this.state.cards.forEach( function(c) {
			numbList.push(c.getCardName());
		});

		return numbList;
	}

	cardColor() {
		var colList = [];
		this.state.cards.forEach(function(c) {
			colList.push(c.getCardCol());
		})
		console.log(colList);
	}

	print(cardDeck) {
		var output = "";
        for (var i = 0; i < cardDeck.length; i++) {
            output = output + "\n" + "Number: " + (cardDeck.at(i).getCardName());
            output = output + " " + "Color: " + (cardDeck.at(i).getCardCol());
            output = output + "\n ---------"
        }
        return output;
	}

	addCard(card) {
		this.state.cards.push(card);
	}

	removeCard(card) {
		var index = this.state.cards.indexOf(card);
		if (index > -1) {
			this.state.cards.splice(index, 1);
		}
	}

	left(leftCards) {
		this.temp = []; // FIND OTHER TYPE OF ARRAY
		var half = Math.floor(leftCards.length/2);

		for(var i = 0; i < half; i++) {
			this.temp.push(leftCards.at(i));
		}
		return this.temp;
	}

	right(rightCards) {
		this.temp = [];
		var half = Math.floor(rightCards.length/2);

		for(var i = half; i < rightCards.length; i++) {
			this.temp.push(rightCards.at(i));
		}

		return this.temp;
	}

	merge(cardDeck, left, right) {
		var i = 0; // left tracker
		var j = 0; // right tracker
		var k = 0;

		while(k < cardDeck.length) {
            if (( (i < left.length) && left.at(i).lessThan(right.at(j), this.whatOrder)) || !(j < (right.length))) {

                cardDeck.setAt(k,left.at(i)); 

                i++;
            }
            else {

                cardDeck.setAt(k,right.at(j)); 

                j++;
            }
            k++;
        }
        return cardDeck;
	}

	mergesort(cardDeck) {
        if (cardDeck.length > 1) {
            var Left = this.left(cardDeck);
            var Right = this.right(cardDeck);

            this.mergesort(Left);
            this.mergesort(Right);

            return this.merge(cardDeck, Left, Right);
        }
    }

    sortCards(whichSort, whatOrder) {
        switch(whichSort) {
            case 'merge':
                this.whatOrder = whatOrder;
                this.mergesort(this.cards);

            break;
        }
        console.log("List of Cards: " + this.printCard());
    }
}