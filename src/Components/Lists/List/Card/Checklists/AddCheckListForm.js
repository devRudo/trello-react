import React from 'react';

class AddCheckListForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checklistName: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            checklistName: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addCheckList(this.state.checklistName);
    }

    render() {
        return (
            <form className="position-absolute addChecklistForm" onSubmit={e => this.handleSubmit(e)}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="text-center">Add Checklist</h6>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="checklistName" className="form-control form-control-sm title" defaultValue="Checklist" autoFocus onChange={(e) => this.handleChange(e)} />
                        </div>
                        <button type="submit" className="btn btn-success">Add</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default AddCheckListForm
