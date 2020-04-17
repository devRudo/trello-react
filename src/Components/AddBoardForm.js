import React from 'react';

export class AddBoardForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boardName: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            boardName: e.target.value
        });
    }

    render() {
        return (
            <div className="col-md-2" id="addboardform">
                <div className="card-header p-0 shadow-sm text-dark mb-3 board">
                    <div className="card-body d-flex justify-content-ceoardnter align-items-center">
                        <form action="/boards" method="post" onSubmit={(e) => this.props.AddBoard(e, this.state.boardName)}>
                            <input type="text" name="board_name" id="name" className="form-control" placeholder="Add borad title..." onChange={(e) => { this.handleChange(e) }} autoFocus />
                            <button type="submit" className="btn btn-success mt-3">Create Board</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddBoardForm;
