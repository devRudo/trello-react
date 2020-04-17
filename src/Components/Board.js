import React from 'react'

class Board extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.match.params.boardId);
    }
    render() {
        return (
            <div>
                Board
            </div>
        )
    }
}

export default Board;
