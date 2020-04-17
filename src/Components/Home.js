import React from 'react'

class Home extends React.Component {
    render() {
        return (
            <div className="container-fluid bg-dark pt-4">
                <div className="row pt-4">
                    <div className="col-md-12 pt-4 d-flex flex-column align-items-center">
                        <h3 className="text-center p-4 text-white"><img src="user.png" className="avatar m-4" alt="" /> Vijay Kumar Mishra</h3>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" href="/settings">Personal Info</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/boards">Activity</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/boards">Cards</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/boards">Settings</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;