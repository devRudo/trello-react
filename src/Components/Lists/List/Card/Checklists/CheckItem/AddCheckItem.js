import React from 'react';

class AddCheckItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkItemName: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            checkItemName: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addCheckItem(this.state.checkItemName);
    }

    render() {
        return (
            <form className="position-relative p-4" onSubmit={e => this.handleSubmit(e)}>
                <div className="d-flex justify-content-between">
                    <input type="text" name="checkItemName" className="form-control" placeholder="Add an item" onChange={e => this.handleChange(e)} autoFocus />
                </div>
                <button type="submit" className="form-control-sm btn btn-success mt-2">Add</button>
            </form>
        )
    }
}

export default AddCheckItem;
