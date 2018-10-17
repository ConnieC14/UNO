import React, { Component } from 'react';
import { COLORS } from "../constants/Constants";
import { SPECIAL_ACTIONS } from "../constants/Constants";
import { NUMBERS } from "../constants/Constants";

import Style from '../style/CreateCard.scss';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

export default class CreateCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: '0',
            isCardSpecial: false,
            selectedColor: "",
            selectedNumber: -1,
            selectedAction: ""
        };

        this.handleCreateCard = this.handleCreateCard.bind(this);
        this.handleNewCard = this.handleNewCard.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleActionChange = this.handleActionChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleRegularCard = this.handleRegularCard.bind(this);
        this.handleSpecialCard = this.handleSpecialCard.bind(this);
        this.handleCancelProcess = this.handleCancelProcess.bind(this);
    }

    handleCreateCard() {
        this.setState({
            step: '0',
            isCardSpecial: false,
            selectedColor: "",
            selectedNumber: -1,
            selectedAction: "",
            step: '0'
        });

        let newcard = {
            number: this.state.selectedNumber,
            color: this.state.selectedColor,
            isCardSpecial: this.state.isCardSpecial,
            specialAct: this.state.selectedAction
        }

        this.props.onCardCreate(newcard);
    }

    handleNewCard() {
        this.setState({ step: '1' });
    }

    handleColorChange(value) {
        this.setState({ selectedColor: value });
    }

    handleActionChange(value) {
        this.setState({ selectedAction: value });
    }

    handleNumberChange(value) {
        this.setState({ selectedNumber: value });
    }

    handleRegularCard() {
        this.setState({
            step: 'regular',
            selectedColor: COLORS[0],
            selectedNumber: NUMBERS[0]
        });
    }

    handleSpecialCard() {
        this.setState({
            step: 'special',
            isCardSpecial: true,
            selectedColor: COLORS[0],
            selectedAction: SPECIAL_ACTIONS[0]
        });
    }

    handleCancelProcess() {
        this.setState({
            step: '0',
            isCardSpecial: false,
            selectedColor: "",
            selectedNumber: -1,
            selectedAction: ""
        });
    }

    renderOption(propList) {
        if (this.state.selectedColor != 'wild') {

            // Handle edge case where there cannot be a colored card with a special action
            if (propList === SPECIAL_ACTIONS) {
                propList = propList.filter(e => e !== 'wild')
            }

            // Handle edge case where there is only a wild draw-four card
            propList = propList.filter(e => e !== 'draw-four')
        }

        if (this.state.selectedColor === 'wild') {
            propList = propList.filter(e => e !== 'draw-two' && e !== 'reverse' && e !== 'skip')
        }

        var listItems = propList.map(function(property, key) {
              return {label: property, value: property}
        });

        // return (
        //   <option key={ key } value={ property.value }>{ property } </option>
        // );
        return listItems;
    }

    inputCall() {
        switch(this.state.step) {
            case '0':
                return(
                    <CSSTransition
                    in={this.state.step === '0'}
                    timeout={300}
                    classNames="create-view"
                    appear
                    >
                        <div className="create-view">
                            <Button label="Create Card" variant="primary" onClick={ this.handleNewCard } />
                        </div>
                    </CSSTransition>);
            break;

            case '1':
                return(
                    <div className="create-view">
                        <Button label="Regular Card" variant="primary" onClick={ this.handleRegularCard } />
                        <Button label="Special Card" variant="primary" onClick={ this.handleSpecialCard } />
                        <Button label="cancel" variant="primary" onClick={ this.handleCancelProcess } />
                    </div>);
            break;

            case 'regular':
                return (
                    <div className="create-view">
                        <Select value={ this.state.selectedColor } onChange={ this.handleColorChange }
                        options={ this.renderOption(COLORS.slice(0,COLORS.length-1)) } />
                        <Select value={ this.state.selectedNumber } onChange={ this.handleNumberChange }
                        options={ this.renderOption(NUMBERS) } />
                        <Button label="done" variant="primary"onClick={ this.handleCreateCard } />
                        <Button label="cancel" variant="primary"onClick={ this.handleCancelProcess } />
                    </div>);
            break;

            case 'special':
                return(
                    <div className="create-view">
                        <Select value={ this.state.selectedColor } onChange={ this.handleColorChange }
                        options={ this.renderOption(COLORS) } />
                        <Select value={ this.state.selectedAction } onChange={ this.handleActionChange }
                        options={ this.renderOption(SPECIAL_ACTIONS) } />
                        <Button label="done" variant="primary" onClick={ () => this.handleCreateCard(this.state) } />
                        <Button label="cancel" variant="primary" onClick={ this.handleCancelProcess } />
                    </div>);
            break;

            case 'cancel':
                return(
                    <div>
                    { inputCall() }
                    </div>);
            break;

            case 'done':

                return(
                    <div>
                    { inputCall() }
                </div>);
        }

    }

    render() {
        return (
            <div className={ Style.container }>
                { this.inputCall() }
            </div>
        )
    }
};
