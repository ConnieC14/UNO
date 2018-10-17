import React, { Component } from 'react';
import { FILTERS } from "../constants/Constants";

export default class FilterDeck extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: FILTERS[0]
        };

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.renderFilterOptions = this.renderFilterOptions.bind(this);
    }

    handleFilterChange(value) {
        this.setState({ current: value });

        this.props.onApplyFilter(value);
    }

    renderFilterOptions(filters) {
        var listItems = filters.map(function(filter, key) {
            return { label: filter, value: filter }
        });
        return listItems;
    }

    render() {
        return (
            <div>
                <Select onChange={ (e) => this.handleFilterChange(e) }
                options={ this.renderFilterOptions(FILTERS)  } required />
            </div>
        );
    }

}
