import React, { Component } from 'react'

class CardModal extends Component {
    render() {
        return (
            <div className="cardModal" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content bg-light">
                        <div className="modal-header border-0">
                            <h5 className="font-weight-bold">vvsd</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-9 mr-0 pr-0">
                                    <p className="text-muted">in list <button>fsfdfasf</button></p>
                                    <div className="cardDescription mb-2">
                                        <h6><i className="fas fa-align-left text-muted mr-2"></i> Description</h6>
                                        <form action="/addCardDescription" method="POST" className="p-4">
                                            <textarea className="form-control description-text" name="desc" placeholder="Add button more detailed description..."></textarea>
                                        </form>
                                        <div className="p-4">
                                            <textarea className="form-control description-text disable bg-light" name="desc" placeholder="Add button more detailed description..." readonly>gsgsdg</textarea>
                                        </div>
                                    </div>
                                    <div className="checklist mb-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h6 className="mb-2 d-flex justify-content-start"><i className="far fa-check-square mr-2"></i> <span type="button" className="updateCheckListbtn">vdavdav</span>
                                            </h6>
                                            <button className="bg-dark p-1 pl-2 pr-2 btn text-white rounded-lg mr-4 deleteChecklist">Delete</button>
                                        </div>
                                        <form action="/updateChecklistName" method="post" className="position-relative p-4 d-none" role="dialog">
                                            <div className="d-flex justify-content-between">
                                                <input type="text" name="checkListName" className="form-control" />
                                                <input type="hidden" name="checkListId" />
                                            </div>
                                            <button type="submit" className="form-control-sm btn btn-success mt-2">Save</button>
                                        </form>
                                        <ul className="pt-2 pb-2">
                                            <li className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex justify-content-start align-content-center">
                                                    <input type="checkbox" className="form-control-sm mr-4 updateCheckItemStatus" />
                                                    <div className="d-flex flex-column">
                                                        <span className="checklistName">vsdgdsg</span>
                                                        <form action="/updateCheckItemName" method="post" className="position-relative updateCheckItemNameForm">
                                                            <div className="d-flex justify-content-between">
                                                                <input type="text" name="checkItemName" className="form-control" />
                                                                <input type="hidden" name="data" />
                                                            </div>
                                                            <button type="submit" className="form-control-sm btn btn-success mt-2">Save</button>
                                                        </form>
                                                    </div>
                                                </div>
                                                <button className="btn fas fa-trash-alt text-muted deleteCheckItem"><i ></i></button>
                                            </li>
                                            <form action="/addCheckListItem" method="post" className="position-relative p-4 d-none">
                                                <div className="d-flex justify-content-between">
                                                    <input type="text" name="checkItemName" className="form-control" placeholder="Add an item" />
                                                    <input type="hidden" name="checkListId" />
                                                </div>
                                                <button type="submit" className="form-control-sm btn btn-success mt-2">Add</button>
                                            </form>
                                            <li className="d-flex align-items-center p-4"><button className="bg-dark p-1 pl-2 pr-2 btn text-white rounded-lg addChecklistItembtn">Add an item</button></li>
                                        </ul>
                                    </div>
                                    <div className="cardActivities mb-2">
                                        <h6><i className="fas fa-dumbbell text-muted mr-2"></i> Activity</h6>

                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <ul className="">
                                        <small className="font-weight-bold text-muted text-uppercase">Add to card</small>
                                        <li className="p-1 pl-2 mt-2 modaloptions rounded-lg"><i className="far fa-user"></i> Members</li>
                                        <li className="p-1 pl-2 mt-2 modaloptions rounded-lg"><i className="fas fa-tag"></i> Labels</li>
                                        <li className="p-1 pl-2 mt-2 modaloptions rounded-lg addChecklistBtn"><i className="fas fa-tasks"></i> Checklist</li>
                                        <form action="/addChecklist" method="post" className="position-absolute addChecklistForm d-none">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h6 className="text-center">Add Checklist</h6>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="form-group">
                                                        <label for="title">Title</label>
                                                        <input type="text" name="checklistName" className="form-control form-control-sm title" value="Checklist" />
                                                        <input type="hidden" name="cardId" />
                                                    </div>
                                                    <button type="submit" className="btn btn-success">Add</button>
                                                </div>
                                            </div>
                                        </form>
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
