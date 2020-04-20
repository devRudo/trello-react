import React from 'react';

class CheckItem extends React.Component {
    render() {
        let { checkItem } = this.props;
        return (
            <li className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-start align-content-center">
                    <input type="checkbox" className="form-control-sm mr-4 updateCheckItemStatus" />
                    <div className="d-flex flex-column">
                        <span className="checklistName">{checkItem.name}</span>
                        <form action="/updateCheckItemName" method="post" className="position-relative updateCheckItemNameForm d-none">
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
        )
    }
}

export default CheckItem;
