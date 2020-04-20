import React, { Component } from 'react';
import axios from 'axios';
import ListHeader from './ListHeader';
import Card from './Card/Card';
import AddCard from './AddCard';
import AddCardBtn from './AddCardBtn';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            showAddCard: false,
            showAddCardBtn: true,
            cards: []
        }
    }

    componentDidMount() {
        this.fetchList();
        this.fetchCards();
    }

    fetchList = () => {
        axios.get(`https://api.trello.com/1/lists/${this.props.id}?key=26ca8095d6e66ddb4574d27071dc67f5&token=13dda1399e9449a68eeeb078e7cd939f289c6e98096c80e76e2a154c0ac4f90b`)
            .then(response => {
                this.setState({
                    list: response.data
                });
            })
    }
    fetchCards = () => {
        axios.get(`https://api.trello.com/1/lists/${this.props.id}/cards?key=26ca8095d6e66ddb4574d27071dc67f5&token=13dda1399e9449a68eeeb078e7cd939f289c6e98096c80e76e2a154c0ac4f90b`)
            .then(response => {
                this.setState({
                    cards: response.data
                });
            })
    }

    toggleAddCard = () => {
        this.setState({
            showAddCard: !this.state.showAddCard,
            showAddCardBtn: !this.state.showAddCardBtn,
        });
    }

    addCard = (cardName) => {
        let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886'];
        if (!notAllowedToDelete.includes(this.props.boardId)) {
            let listId = this.state.list.id;
            axios.post(`https://api.trello.com/1/cards?name=${cardName}&idList=${listId}&pos=bottom&key=26ca8095d6e66ddb4574d27071dc67f5&token=13dda1399e9449a68eeeb078e7cd939f289c6e98096c80e76e2a154c0ac4f90b`)
                .then(response => {
                    let { cards } = this.state;
                    let updatedCards = cards.concat(response.data);
                    this.setState({
                        cards: updatedCards
                    });
                    this.toggleAddCard();
                });
        }
        else {
            this.toggleAddCard();
        }
    }

    deleteCard = (cardId) => {
        let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886'];
        if (!notAllowedToDelete.includes(this.props.boardId)) {
            axios.delete(`https://api.trello.com/1/cards/${cardId}?key=26ca8095d6e66ddb4574d27071dc67f5&token=13dda1399e9449a68eeeb078e7cd939f289c6e98096c80e76e2a154c0ac4f90b`)
                .then(response => {
                    let { cards } = this.state;
                    let updatedCards = cards.filter(card => card.id !== cardId);
                    this.setState({
                        cards: updatedCards
                    });
                });
        }
    }

    editListName = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            e.persist();
            let updatedName = e.target.innerText;
            let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886'];
            if (!notAllowedToDelete.includes(this.props.boardId)) {
                axios.put(`https://api.trello.com/1/lists/${this.state.list.id}?name=${updatedName}&key=26ca8095d6e66ddb4574d27071dc67f5&token=13dda1399e9449a68eeeb078e7cd939f289c6e98096c80e76e2a154c0ac4f90b`)
                    .then(response => {
                        let { list } = this.state;
                        list.name = updatedName;
                        this.setState({
                            list
                        });
                        e.target.setAttribute('contentEditable', false);
                    })
            }
            else {
                e.target.setAttribute('contentEditable', false);
                window.location.reload();
            }

        }
    }

    render() {
        if (this.state.list) {
            return (
                <div className="col-md-2">
                    <ul className="list-group">
                        <li>
                            <div className="card shadow text-dark mb-3 rounded-lg">
                                <div className="card-header p-2 rounded-lg">
                                    <ListHeader listName={this.state.list.name} deleteList={() => { this.props.deleteList(this.state.list.id) }} editListName={this.editListName} />
                                    <ul className="list-group" id="listcard">
                                        {this.state.cards ?
                                            this.state.cards.map(card => <Card key={card.id} id={card.id} deleteCard={this.deleteCard} listName={this.state.list.name} />)
                                            : null}
                                    </ul>
                                    {this.state.showAddCard ? <AddCard toggleAddCard={this.toggleAddCard} addCard={(cardName) => this.addCard(cardName)} /> : null}
                                    {this.state.showAddCardBtn ? <AddCardBtn toggleAddCard={this.toggleAddCard} /> : null}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            )
        }
        else {
            return null;
        }
    }
}

export default List;
