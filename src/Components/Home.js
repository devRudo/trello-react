import React from 'react'
import { Link } from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <div className="container-fluid bg-dark pt-4">
                <div className="row pt-4">
                    <div className="col-md-12 pt-4 d-flex flex-column align-items-center">
                        <h3 className="text-center p-4 text-white"><img src="user.png" className="avatar m-4" alt="" /> Vijay Kumar Mishra</h3>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/settings">Personal Info</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/boards">Activity</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/boards">Cards</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/boards">Settings</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;