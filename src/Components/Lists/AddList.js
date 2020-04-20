import React, { Component } from 'react';
import AddListForm from './AddListForm';
import AddListBtn from './AddListBtn';

class AddList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddListForm: false,
            showAddListBtn: true
        }
    }

    toggleAddList = () => {
        this.setState({
            showAddListForm: !this.state.showAddListForm,
            showAddListBtn: !this.state.showAddListBtn,
        })
    }

    addList = (listName) => {
        this.toggleAddList();
        this.props.addList(listName);
    }

    render() {
        return (
            <div className="col-md-2">
                <ul className="list-group">
                    <li>
                        <div className="card shadow mb-3 rounded-lg">
                            <div className="card-header p-2 rounded-lg">
                                <ul>
                                    {this.state.showAddListForm ? <AddListForm toggleAddList={this.toggleAddList} addList={(listName) => this.addList(listName)} /> : null}
                                    {this.state.showAddListBtn ? <AddListBtn toggleAddList={this.toggleAddList} /> : null}
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default AddList;
