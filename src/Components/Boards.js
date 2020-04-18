import React from 'react';
import axios from 'axios';
import SingleBoard from './SingleBoard';
import AddBoard from './AddBoard';

class Boards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://api.trello.com/1/members/me/boards/?key=26ca8095d6e66ddb4574d27071dc67f5&token=13dda1399e9449a68eeeb078e7cd939f289c6e98096c80e76e2a154c0ac4f90b',
            boards: []
        }
    }

    componentDidMount() {
        this.fetchBoards(this.state.url)
            .then(response => {
                this.setState({
                    boards: response.data
                })
            });
    }

    fetchBoards = async (url) => {
        return await axios.get(url);
    }

    addBoard = (boardName) => {
        if (boardName !== "") {
            axios.post(`https://api.trello.com/1/boards?name=${boardName}&key=26ca8095d6e66ddb4574d27071dc67f5&token=13dda1399e9449a68eeeb078e7cd939f289c6e98096c80e76e2a154c0ac4f90b`)
                .then((response) => {
                    let boards = this.state.boards;
                    let updatedBoards = boards.concat(response.data);
                    this.setState({
                        boards: updatedBoards
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    deleteBoard = (e, boardId) => {
        e.preventDefault();
        let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886', '5e888bce45f5e186182c5c8e'];
        if (!notAllowedToDelete.includes(boardId)) {
            axios.delete(`https://api.trello.com/1/boards/${boardId}/?key=26ca8095d6e66ddb4574d27071dc67f5&token=13dda1399e9449a68eeeb078e7cd939f289c6e98096c80e76e2a154c0ac4f90b`)
                .then((response) => {
                    let boards = this.state.boards;
                    let updatedBoards = boards.filter(board => board.id !== boardId);
                    this.setState({
                        boards: updatedBoards
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row p-4">
                    <h3 className="col-md-12 page-title">Personal Boards</h3>
                </div>
                <div className="row p-4 d-none" id="status">
                    <div className="col-md-12 alert"></div>
                </div>
                <div className="row p-4">
                    {this.state.boards.map(board =>
                        <SingleBoard key={board.id} id={board.id} boardName={board.name} deleteBoard={(e) => this.deleteBoard(e, board.id)} />
                    )}
                    <AddBoard addBoard={this.addBoard} />
                </div>
            </div>
        )
    }
}

export default Boards;
