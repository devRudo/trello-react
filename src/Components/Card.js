import React, { Component } from 'react';
import axios from 'axios';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: null,
            showCardOptions: false,
            showEditCard: false
        }
    }

    componentDidMount() {
        this.fetchCard();
    }

    fetchCard = () => {
        axios.get(`https://api.trello.com/1/cards/${this.props.id}?key=26ca8095d6e66ddb4574d27071dc67f5&token=13dda1399e9449a68eeeb078e7cd939f289c6e98096c80e76e2a154c0ac4f90b`)
            .then(response => {
                this.setState({
                    card: response.data
                });
            })
    }

    toggleEdit = () => {
        this.setState({
            showEditCard: !this.state.showEditCard
        })
    }

    toggleOptions = () => {
        this.setState({
            showCardOptions: !this.state.showCardOptions
        })
    }

    deleteCard = (cardId) => {
        this.toggleOptions();
        this.props.deleteCard(cardId);
    }

    render() {
        if (this.state.card) {
            const { card } = this.state;
            return (
                <React.Fragment>
                    <li className="list-group-item p-1 pl-2 rounded-lg mb-2 shadow-sm cardDiv" onMouseEnter={this.toggleEdit} onMouseLeave={this.toggleEdit}>
                        <div className="cardName p-0">
                            <p>{this.state.card.name}</p>
                            {this.state.showEditCard ? <button className="btn btn-sm position-absolute editCard" onClick={this.toggleOptions}><i className="fas fa-pencil-alt text-dark"></i></button> : null}
                        </div>
                        {card.badges.description ?
                            <i className="fas fa-align-left text-muted"></i>
                            : null}
                        {card.idChecklists.length ?
                            <React.Fragment><i className="far fa-check-square text-muted ml-3"></i><span>{card.badges.checkItemsChecked}<span>/</span>{card.badges.checkItems}</span></React.Fragment>
                            : null
                        }
                    </li>
                    {this.state.showCardOptions ?
                        <div className="position-absolute cardOptions">
                            <ul className="list-group p-2">
                                <li className="list-group-item m-2 p-1 deleteCard" onClick={() => this.deleteCard(card.id)}>Delete card</li>
                                <li className="list-group-item m-2 p-1">Move card</li>
                                <li className="list-group-item m-2 p-1">Copy card</li>
                            </ul>
                        </div>
                        : null}
                </React.Fragment>
            )
        }
        else {
            return null;
        }
    }
}

export default Card;
