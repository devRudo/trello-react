import React from 'react';
import CheckItem from './CheckItem';
import AddCheckItem from './CheckItem/AddCheckItem';
import axios from 'axios';

class CheckList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddCheckItem: false
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (state.checklist === undefined) {
            return { checklist: props.checklist };
        }
        else {
            return state;
        }
    }

    showAddCheckItem = () => {
        this.setState({
            showAddCheckItem: !this.state.showAddCheckItem
        })
    }

    addCheckItem = (checkItemName) => {
        let { checklist } = this.state;
        let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886'];
        if (!notAllowedToDelete.includes(checklist.idBoard)) {
            axios.post(`https://api.trello.com/1/checklists/${checklist.id}/checkItems?name=${checkItemName}&pos=bottom&key=26ca8095d6e66ddb4574d27071dc67f5&token=13dda1399e9449a68eeeb078e7cd939f289c6e98096c80e76e2a154c0ac4f90b`)
                .then(response => {
                    let updatedCheckItems = checklist.checkItems.concat(response.data);
                    checklist.checkItems = updatedCheckItems;
                    this.setState({
                        checklist,
                        showAddCheckItem: !this.state.showAddCheckItem
                    });
                })
        }
    }

    deleteCheckItem = (checkItemId) => {
        let { checklist } = this.state;
        let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886'];
        if (!notAllowedToDelete.includes(checklist.idBoard)) {
            axios.delete(`https://api.trello.com/1/checklists/${checklist.id}/checkItems/${checkItemId}?key=26ca8095d6e66ddb4574d27071dc67f5&token=13dda1399e9449a68eeeb078e7cd939f289c6e98096c80e76e2a154c0ac4f90b`)
                .then(response => {
                    let updatedCheckItems = checklist.checkItems.filter(checkItem => checkItem.id !== checkItemId);
                    checklist.checkItems = updatedCheckItems;
                    this.setState({
                        checklist,
                    });
                })
        }
    }

    editCheckItemName = (checkItemId, checkItemName) => {
        let { checklist } = this.state;
        let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886'];
        if (!notAllowedToDelete.includes(checklist.idBoard)) {
            axios.put(`https://api.trello.com/1/cards/${checklist.idCard}/checkItem/${checkItemId}?name=${checkItemName}&key=26ca8095d6e66ddb4574d27071dc67f5&token=13dda1399e9449a68eeeb078e7cd939f289c6e98096c80e76e2a154c0ac4f90b`)
                .then(response => {
                    this.props.updateCheckItem(checklist.id, checkItemId, checkItemName);
                })
        }
    }

    render() {
        let { checklist } = this.props;
        return (
            <div className="checklist mb-2">
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-2 d-flex justify-content-start"><i className="far fa-check-square mr-2"></i> <span>{checklist.name}</span>
                    </h6>
                    <button className="bg-dark p-1 pl-2 pr-2 btn text-white rounded-lg mr-4 deleteChecklist" onClick={(checklistId) => this.props.deleteChecklist(checklist.id)}>Delete</button>
                </div>
                <form action="/updateChecklistName" method="post" className="position-relative p-4 d-none" role="dialog">
                    <div className="d-flex justify-content-between">
                        <input type="text" name="checkListName" className="form-control" />
                        <input type="hidden" name="checkListId" />
                    </div>
                    <button type="submit" className="form-control-sm btn btn-success mt-2">Save</button>
                </form>
                <ul className="pt-2 pb-2">
                    {checklist.checkItems ? checklist.checkItems.map(checkItem => <CheckItem key={checkItem.id} checkItem={checkItem} deleteCheckItem={this.deleteCheckItem} editCheckItemName={this.editCheckItemName} />) : null}
                    {this.state.showAddCheckItem ? <AddCheckItem addCheckItem={this.addCheckItem} /> : null}
                    <li className="d-flex align-items-center p-4" onClick={this.showAddCheckItem}><button className="bg-dark p-1 pl-2 pr-2 btn text-white rounded-lg addChecklistItembtn">Add an item</button></li>
                </ul>
            </div>
        )
    }
}

export default CheckList;
