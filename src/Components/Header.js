import React from 'react'

class Header extends React.Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm">
                    <a className="navbar-brand" href="/"><img src="/biglogo.png" alt="" style={{ width: '100px' }} /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="nav">
                        <ul className="navbar-nav">
                            <li className="nav-item active m-2 m-sm-2 m-md-2 m-lg-0">
                                <a className="nav-link btn text-white" style={{ backgroundColor: '#0079c1' }} href="/boards">Boards</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header;