import React, { Component } from 'react';
import axios from 'axios';
import CardDescription from './CardDescription';
import Checklist from './Checklists/CheckList';
import AddCheckListForm from './Checklists/AddCheckListForm';

class CardModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checklists: null,
            showAddChecklist: false
        }
    }

    componentDidMount() {
        this.fetchCheckLists(this.state.card.id);

    }

    static getDerivedStateFromProps(props, state) {
        if (state.card === undefined) {
            return { card: props.card }
        }
        else {
            return state;
        }

    }

    fetchCheckLists = (cardId) => {
        axios.get(`https://api.trello.com/1/cards/${this.props.cardId}/checklists?key=26ca8095d6e66ddb4574d27071dc67f5&token=13dda1399e9449a68eeeb078e7cd939f289c6e98096c80e76e2a154c0ac4f90b`)
            .then(response => {
                this.setState({
                    checklists: response.data
                })
            });
    }

    showAddChecklist = () => {
        this.setState({
            showAddChecklist: !this.state.showAddChecklist
        })
    }

    addCheckList = (checkListName) => {
        let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886'];
        if (!notAllowedToDelete.includes(this.state.card.idBoard)) {
            axios.post(`https://api.trello.com/1/checklists?name=${checkListName}&idCard=${this.props.cardId}&pos=bottom&key=26ca8095d6e66ddb4574d27071dc67f5&token=13dda1399e9449a68eeeb078e7cd939f289c6e98096c80e76e2a154c0ac4f90b`)
                .then(response => {
                    let { checklists } = this.state;
                    this.setState({
                        checklists: checklists.concat(response.data),
                        showAddChecklist: !this.state.showAddChecklist
                    });
                })
        }
        else {
            this.setState({
                showAddChecklist: !this.state.showAddChecklist
            });
        }
    }

    deleteChecklist = (checklistId) => {
        let { checklists } = this.state;
        let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886'];
        if (!notAllowedToDelete.includes(checklists[0].idBoard)) {
            axios.delete(`https://api.trello.com/1/checklists/${checklistId}?key=26ca8095d6e66ddb4574d27071dc67f5&token=13dda1399e9449a68eeeb078e7cd939f289c6e98096c80e76e2a154c0ac4f90b`)
                .then(response => {
                    let updatedChecklists = checklists.filter(checklist => checklist.id !== checklistId);
                    this.setState({
                        checklists: updatedChecklists,
                    });
                })
        }
    }

    updateCheckItem = (checklistId, checkItemId, checkItemName) => {
        let { checklists } = this.state;
        let checklist = checklists.filter(checklist => checklist.id === checklistId)[0].checkItems.map(checkItem => {
            if (checkItem.id === checkItemId) {
                checkItem.name = checkItemName;
            }
            return checkItem;
        });
        let updatedChecklists = checklists.map(checklistthis => {
            if (checklist.id === checklistId) {
                checklistthis = checklist
            }
            return checklist;
        })
        this.setState({
            checklist: updatedChecklists
        })

    }

    render() {
        return (
            <div className="modal" id={this.props.cardId} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content bg-light">
                        <div className="modal-header border-0">
                            <h5 className="font-weight-bold">{this.state.card.name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-9 mr-0 pr-0">
                                    <p className="text-muted">in list <button className="btn">{this.props.listName}</button></p>
                                    <CardDescription />
                                    {this.state.checklists ? this.state.checklists.map(checklist => <Checklist key={checklist.id} checklist={checklist} deleteChecklist={this.deleteChecklist} updateCheckItem={this.updateCheckItem} />) : null}
                                    <div className="cardActivities mb-2">
                                        <h6><i className="fas fa-dumbbell text-muted mr-2"></i> Activity</h6>

                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <ul className="">
                                        <small className="font-weight-bold text-muted text-uppercase">Add to card</small>
                                        <li className="p-1 pl-2 mt-2 modaloptions rounded-lg"><i className="far fa-user"></i> Members</li>
                                        <li className="p-1 pl-2 mt-2 modaloptions rounded-lg"><i className="fas fa-tag"></i> Labels</li>
                                        <li className="p-1 pl-2 mt-2 modaloptions rounded-lg addChecklistBtn" onClick={this.showAddChecklist}><i className="fas fa-tasks"></i> Checklist</li>
                                        {this.state.showAddChecklist ? <AddCheckListForm addCheckList={this.addCheckList} /> : null}
                                        <li className="p-1 pl-2 mt-2 modaloptions rounded-lg"><i className="far fa-clock"></i> Due Date</li>
                                        <li className="p-1 pl-2 mt-2 modaloptions rounded-lg"><i className="fas fa-paperclip"></i> Attachment</li>
                                    </ul>
                                    <ul className="mt-4">
                                        <small className="font-weight-bold text-muted text-uppercase">Actions</small>
                                        <li className="p-1 pl-2 mt-2 modaloptions rounded-lg"><i className="fas fa-arrow-right"></i> Move</li>
                                        <li className="p-1 pl-2 mt-2 modaloptions rounded-lg"><i className="far fa-copy"></i> Copy</li>
                                        <li className="p-1 pl-2 mt-2 modaloptions rounded-lg"><i className="fas fa-archive"></i> Archive</li>
                                        <li className="p-1 pl-2 mt-2 modaloptions rounded-lg"><i className="far fa-share-square"></i> Share</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CardModal;
