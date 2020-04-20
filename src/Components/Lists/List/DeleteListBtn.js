import React, { Component } from 'react';

class DeleteListBtn extends Component {
    render() {
        return (
            <div className="position-absolute shadow bg-white text-dark deleteList rounded-lg" onClick={() => { this.props.deleteList() }}>
                <h6>delete this list</h6>
            </div>
        )
    }
}

export default DeleteListBtn;
