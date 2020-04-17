import React, { Component } from 'react'

export class AddBoardDiv extends Component {
    render() {
        return (
            <button className="col-md-2 btn" onClick={() => this.props.showAddForm()} id="addboard">
                <div className="card-header p-0 shadow text-dark mb-3 board">
                    <div className="card-body d-flex justify-content-center align-items-center">
                        <h6 className="text-muted btn-lg"> Create new board</h6>
                    </div>
                </div>
            </button>
        )
    }
}

export default AddBoardDiv;
