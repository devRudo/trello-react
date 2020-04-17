import React from 'react';
import AddBoardForm from './AddBoardForm';
import AddBoardDiv from './AddBoardDiv';

export class AddBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddForm: false,
            showAddDiv: true
        }
    }

    showAddForm = () => {
        this.setState({
            showAddForm: true,
            showAddDiv: false
        })
    }

    addBoard = (e, boardName) => {
        e.preventDefault();
        console.log(boardName);
        this.props.addBoard(boardName);
        this.setState({
            showAddDiv: true,
            showAddForm: false
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.showAddDiv ? <AddBoardDiv showAddForm={this.showAddForm} /> : null}
                {this.state.showAddForm ? <AddBoardForm AddBoard={this.addBoard} /> : null}
            </React.Fragment>
        )
    }
}

export default AddBoard;
