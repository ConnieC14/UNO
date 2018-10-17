import React, { Component } from 'react';

export default class DeckSorter extends Component {
	constructor(props) {
        super(props);

        this.handleCardSort = this.handleCardSort.bind(this);
    }

    /** EVENT LISTENER METHODS **/
    handleCardSort(whichSort, whatOrder) {
        this.props.onCardSort(whichSort, whatOrder);
    }

	render() {
        return (
            <div>
                <Button label="Alphabetical" variant='secondary' onClick={ () => this.handleCardSort('merge','alphabetical') } />
                <Button label="By Color" variant='secondary' onClick={ () => this.handleCardSort('merge','color') } />
            </div>
        );
    }

}
