import React, { Component } from 'react'

class AddCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardName: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            cardName: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addCard(this.state.cardName);
    }

    render() {
        return (
            <form className="list-group" onSubmit={(e) => this.handleSubmit(e)}>
                <input type="text" name="name" className="list-group-item rounded-lg p-1 mb-3 shadow-sm" placeholder="Enter the title of this card..." autoFocus onChange={(e) => this.handleChange(e)} />
                <div className="d-flex justify-content-between align-items-center">
                    <button type="submit" className="btn btn-success">Add Card</button>
                    <button className="btn" onClick={() => this.props.toggleAddCard()}><span style={{ fontSize: '30px' }}>&times;</span></button>
                </div>
            </form>
        )
    }
}

export default AddCard;
