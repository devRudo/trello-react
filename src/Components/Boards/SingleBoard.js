import React from 'react';
import { Link } from 'react-router-dom';

class SingleBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDelete: false
        }
    }

    componentDidMount() {
        this.setState({
            boardId: this.props.id
        })
    }

    deleteDiv = (e) => {
        e.preventDefault();
        this.setState({
            showDelete: !this.state.showDelete
        })
    }

    deleteBoard = (e) => {
        this.deleteDiv(e);
        this.props.deleteBoard(e);
    }

    render() {
        let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886', '5e888bce45f5e186182c5c8e'];
        let notAllowed = notAllowedToDelete.includes(this.props.id) ? 'notAllowed' : null;
        return (
            <Link to={`/boards/${this.state.boardId}`} className="col-md-2">
                <div className={`card shadow text-dark mb-3 board ${notAllowed}`} id={this.props.id}>
                    <div className="card-body d-flex justify-content-center align-items-center">
                        <i className="fas fa-ellipsis-v position-absolute deleteBoard" onClick={(e) => this.deleteDiv(e)}></i>
                        {this.state.showDelete ? (<div className="position-absolute btn shadow-sm btn-primary deleteBoardDiv rounded-lg" onClick={(e) => this.deleteBoard(e)}>
                            <h6>delete this board</h6>
                        </div>) : null}
                        <h6 className="boardName">{this.props.boardName}</h6>
                    </div>
                </div>
            </Link >
        )
    }
}

export default SingleBoard;
