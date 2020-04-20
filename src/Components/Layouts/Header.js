import React from 'react'
import { Link } from 'react-router-dom';
class Header extends React.Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm">
                    <Link className="navbar-brand" to="/"><img src="/biglogo.png" alt="" style={{ width: '100px' }} /></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="nav">
                        <ul className="navbar-nav">
                            <li className="nav-item active m-2 m-sm-2 m-md-2 m-lg-0">
                                <Link className="nav-link btn text-white" style={{ backgroundColor: '#0079c1' }} to="/boards">Boards</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header;