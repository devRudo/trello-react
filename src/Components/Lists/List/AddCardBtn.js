import React, { Component } from 'react'

class AddCardBtn extends Component {
    render() {
        return (
            <p className="mb-2 mt-3 pl-2 addcard" onClick={() => this.props.toggleAddCard()}>
                <b className="">+</b>
                 Add another card
            </p>
        )
    }
}

export default AddCardBtn;
