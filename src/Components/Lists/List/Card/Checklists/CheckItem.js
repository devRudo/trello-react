import React from 'react';

class CheckItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditCheckItem: false,
            isChecked: props.status,
            checkItemName: ''
        }
    }

    showEditCheckItem = () => {
        this.setState({
            showEditCheckItem: !this.state.showEditCheckItem
        })
    }

    handleChange = (e) => {
        this.setState({
            checkItemName: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editCheckItemName(this.props.checkItem.id, this.state.checkItemName);
        this.setState({
            showEditCheckItem: false
        });
    }

    changeCheckedStatus = (e) => {
        this.setState({
            isChecked: e.target.checked
        });
        this.props.changeCheckedStatus(this.state.isChecked);
    }

    render() {
        let { checkItem } = this.props;
        let isChecked = this.state.isChecked;
        return (
            <li className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-start align-content-center">
                    <input type="checkbox" onChange={(e) => this.changeCheckedStatus(e)} className="form-control-sm mr-4 updateCheckItemStatus" checked={isChecked} />
                    <div className="d-flex flex-column">
                        {this.state.showEditCheckItem ?
                            <form className="position-relative updateCheckItemNameForm" onSubmit={e => this.handleSubmit(e)}>
                                <div className="d-flex justify-content-between">
                                    <input type="text" name="checkItemName" className="form-control" defaultValue={checkItem.name} onChange={e => this.handleChange(e)} autoFocus />
                                </div>
                                <button type="submit" className="form-control-sm btn btn-success mt-2">Save</button>
                            </form> : <span className="checklistName" onClick={this.showEditCheckItem}>{checkItem.name}</span>}
                    </div>
                </div>
                <button className="btn fas fa-trash-alt text-muted deleteCheckItem" onClick={(checkItemId) => this.props.deleteCheckItem(checkItem.id)}><i ></i></button>
            </li>
        )
    }
}

export default CheckItem;
