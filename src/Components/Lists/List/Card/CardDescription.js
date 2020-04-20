import React from 'react';

class CardDescription extends React.Component {
    render() {
        return (
            <div className="cardDescription mb-2">
                <h6><i className="fas fa-align-left text-muted mr-2"></i> Description</h6>
                {/* <form action="/addCardDescription" method="POST" className="p-4">
                    <textarea className="form-control description-text" name="desc" placeholder="Add button more detailed description..."></textarea>
                </form>
                <div className="p-4">
                    <textarea className="form-control description-text disable bg-light" name="desc" placeholder="Add button more detailed description..." readOnly></textarea>
                </div> */}
            </div>
        )
    }
}

export default CardDescription;
