import React, { Component } from 'react'

class AddListForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listName: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            listName: e.target.value
        })
    }

    handleSubmit = (e, listName) => {
        e.preventDefault();
        this.props.addList(listName);
    }

    render() {
        return (
            <form className="list-group" onSubmit={(e) => { this.handleSubmit(e, this.state.listName) }}>
                <input type="text" name="name" className="list-group-item rounded-lg p-1 mb-3 shadow-sm" placeholder="Enter the title for this list..." autoFocus onChange={(e) => this.handleChange(e)} />
                <div className="d-flex justify-content-between align-items-center">
                    <button type="submit" className="btn btn-success">Add List</button>
                    <button className="btn" onClick={() => this.props.toggleAddList()}><span style={{ fontSize: '30px' }}>&times;</span></button>
                </div>
            </form>
        )
    }
}

export default AddListForm;
