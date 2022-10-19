import { Link } from 'react-router-dom';
import Nav from './Nav';
import logo from './img/icon.png'

function Header() {
	return (
		<header className="header">
			<Link to="/"><img src={logo} alt="lang dev" width="210" height="80" /></Link>
			<Nav />
		</header>
	);
}

export default Header;