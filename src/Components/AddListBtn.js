import React, { Component } from 'react';

class AddListBtn extends Component {
    render() {
        return (
            <p className="mb-2 mt-3 pl-2" id="addlist" onClick={() => this.props.toggleAddList()}><b className="mr-2">+</b> Add another list</p>
        )
    }
}

export default AddListBtn;
