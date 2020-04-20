import React, { Component } from 'react';
import DeleteListBtn from './DeleteListBtn';

class ListHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteBtn: false
        }
    }

    toggleDelete = () => {
        this.setState({
            showDeleteBtn: !this.state.showDeleteBtn
        })
    }

    deleteList = () => {
        this.toggleDelete();
        this.props.deleteList();
    }

    makeListNameEditable = (e) => {
        e.target.contentEditable = true;
    }

    editListName = (e) => {
        this.props.editListName(e);
    }

    render() {
        return (
            <div className="d-flex justify-content-between align-items-center">
                <p className="mb-2 mt-2 p-1 pl-2 listName" style={{ cursor: 'pointer' }} onClick={(e) => this.makeListNameEditable(e)} onFocus={() => document.execCommand('selectAll', false, null)} onKeyDown={(e) => this.editListName(e)}>{this.props.listName}</p>
                <button className="btn btn-sm position-absolute listOption" onClick={this.toggleDelete}><i className="fas fa-ellipsis-h text-dark"></i></button>
                {this.state.showDeleteBtn ? <DeleteListBtn deleteList={this.deleteList} /> : null}
            </div>
        )
    }
}

export default ListHeader;
