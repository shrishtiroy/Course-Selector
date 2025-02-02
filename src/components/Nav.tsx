import {Link} from "react-router-dom"
import "../css/Nav.css"
import {useState, useEffect} from "react"
import makeSticky from "../components/MakeSticky"

function Nav () {
	const isSticky = makeSticky();

	return <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
		<div className="navbar">
			<div className="navbar-title">
        <img src = "https://branding.web-resources.upenn.edu/sites/default/files/styles/card_3x2/public/2022-03/UniversityofPennsylvania_Shield_RGB-2.png?h=3c287ac3&itok=HgG1DNc-"/>
				<Link to="/">Penn Course Cart</Link>
			</div>
			<div className="navbar-links">
				<Link to="/" className="nav-link">Courses </Link>
				<Link to="/cart" className="nav-link">Cart </Link>
			</div>
		</div>
	</nav>
}

export default Nav
