import React, { Component } from 'react';
import axios from 'axios';
import CardModal from './CardModal';
import $ from 'jquery';

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

    toggleModal = (e, id) => {
        e.stopPropagation();
        if (!$(e.target).attr('contentEditable')) {
            $(`#${id}`).modal('toggle');
        }
    }

    toggleOptions = (e) => {
        e.stopPropagation();
        $(e.target).parent().prev().attr('contentEditable', 'true');
        $(e.target).parent().prev().focus();
        this.setState({
            showCardOptions: !this.state.showCardOptions
        })
    }

    deleteCard = (cardId) => {
        this.toggleOptions();
        this.props.deleteCard(cardId);
    }

    editCardName = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            e.persist();
            let updatedName = e.target.innerText;
            let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886'];
            if (!notAllowedToDelete.includes(this.state.card.idBoard)) {
                axios.put(`https://api.trello.com/1/cards/${this.state.card.id}?name=${updatedName}&key=26ca8095d6e66ddb4574d27071dc67f5&token=13dda1399e9449a68eeeb078e7cd939f289c6e98096c80e76e2a154c0ac4f90b`)
                    .then(response => {
                        let { card } = this.state;
                        card.name = updatedName;
                        this.setState({
                            card,
                            showCardOptions: !this.state.showCardOptions
                        });
                        e.target.setAttribute('contentEditable', false);
                    })
            }
            else {
                e.target.setAttribute('contentEditable', false);
            }

        }
    }

    render() {
        if (this.state.card) {
            const { card } = this.state;
            return (
                <React.Fragment>
                    <li className="list-group-item p-1 pl-2 rounded-lg mb-2 shadow-sm cardDiv" onClick={(e) => this.toggleModal(e, card.id)} onMouseEnter={this.toggleEdit} onMouseLeave={this.toggleEdit}>
                        <div className="cardName p-0">
                            <p onFocus={() => document.execCommand('selectAll', false, null)} onKeyDown={(e) => this.editCardName(e)}>{this.state.card.name}</p>
                            {this.state.showEditCard ? <button className="btn btn-sm position-absolute editCard" onClick={(e) => this.toggleOptions(e)}><i className="fas fa-pencil-alt text-dark"></i></button> : null}
                        </div>
                        {card.badges.description ?
                            <i className="fas fa-align-left text-muted" style={{ transform: 'rotate(180deg) scale(-1,1)' }}></i>
                            : null}
                        {card.idChecklists.length ?
                            <React.Fragment><i className="far fa-check-square text-muted ml-2 mt-2"></i>&nbsp;<span>{card.badges.checkItemsChecked}<span>/</span>{card.badges.checkItems}</span></React.Fragment>
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
                    <CardModal cardId={card.id} card={card} listName={this.props.listName} />
                </React.Fragment>
            )
        }
        else {
            return null;
        }
    }
}

export default Card;
