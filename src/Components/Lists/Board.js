import React from 'react';
import axios from 'axios';
import List from './List/List';
import AddList from './AddList';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boardId: props.match.params.boardId,
            loading: true,
            board: null,
            lists: []
        }
    }

    componentDidMount() {
        this.fetchAllInsideBoard();
    }

    fetchAllInsideBoard = async () => {
        await axios.get(`https://api.trello.com/1/boards/${this.state.boardId}?lists=open&key=26ca8095d6e66ddb4574d27071dc67f5&token=13dda1399e9449a68eeeb078e7cd939f289c6e98096c80e76e2a154c0ac4f90b`)
            .then(response => {
                setTimeout(() => {
                    this.setState({
                        board: response.data,
                        lists: response.data.lists,
                        loading: false
                    });
                }, 1000);
            })
    }

    addList = (listName) => {
        let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886'];
        if (!notAllowedToDelete.includes(this.state.boardId)) {
            axios.post(`https://api.trello.com/1/lists?name=${listName}&idBoard=${this.state.boardId}&pos=bottom&key=26ca8095d6e66ddb4574d27071dc67f5&token=13dda1399e9449a68eeeb078e7cd939f289c6e98096c80e76e2a154c0ac4f90b`)
                .then(response => {
                    let { lists } = this.state;
                    let updatedLists = lists.concat(response.data);
                    this.setState({
                        lists: updatedLists
                    });
                });
        }
    }

    deleteList = (listId) => {
        let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886'];
        if (!notAllowedToDelete.includes(this.state.boardId)) {
            axios.put(`https://api.trello.com/1/lists/${listId}/closed?value=true&key=26ca8095d6e66ddb4574d27071dc67f5&token=13dda1399e9449a68eeeb078e7cd939f289c6e98096c80e76e2a154c0ac4f90b`)
                .then(response => {
                    let { lists } = this.state;
                    let updatedLists = lists.filter(list => list.id !== listId);
                    this.setState({
                        lists: updatedLists
                    });
                })
        }
    }

    makeBoardNameEditable = (e) => {
        e.target.contentEditable = true;
    }

    editBoardName = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            let updatedName = e.target.innerText;
            let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886', '5e888bce45f5e186182c5c8e'];
            if (!notAllowedToDelete.includes(this.state.boardId)) {
                axios.put(`https://api.trello.com/1/boards/${this.state.boardId}?name=${updatedName}&key=26ca8095d6e66ddb4574d27071dc67f5&token=13dda1399e9449a68eeeb078e7cd939f289c6e98096c80e76e2a154c0ac4f90b`)
                    .then(response => {
                        let { board } = this.state;
                        board.name = updatedName;
                        this.setState({
                            board,
                            loading: true
                        });
                        setTimeout(() => {
                            this.setState({
                                loading: false
                            })
                        }, 500);
                    })
            }
            else {
                this.setState({
                    loading: true
                });
                setTimeout(() => {
                    this.setState({
                        loading: false
                    })
                }, 500);
                e.target.setAttribute('contentEditable', false);
            }

        }
    }


    render() {
        if (!this.state.loading) {
            return (
                <div className="container-fluid">
                    <div className="row p-4">
                        <div className="col-md-12">
                            <h3 className="d-inline page-title" id="boardName" onFocus={() => document.execCommand('selectAll', false, null)} onClick={(e) => this.makeBoardNameEditable(e)} onKeyDown={(e) => this.editBoardName(e)}>{this.state.board ? this.state.board.name : null}</h3>
                        </div>
                    </div>
                    <div className="row p-4">{this.state.lists.map((list) => <List key={list.id} id={list.id} deleteList={this.deleteList} boardId={this.state.boardId} />)}
                        <AddList addList={this.addList} />
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="container-fluid loading">
                    <div className="circle">
                        <div className="inner-circle"></div>
                        <div className="rotating-circle"></div>
                    </div>
                </div>
            )
        }
    }
}

export default Board;
