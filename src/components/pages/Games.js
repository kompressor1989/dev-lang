import { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../Main";
// import Group from './img/Group.png'

function Games() {
	const {libraryGames} = useContext(MainContext);

	return (
		<div className="page">
			<div className="games">
				<ul className="games__list">
					{libraryGames.map((item, index) => {
						return (
							<li key={index} className="games__item">
								<Link to={`/games/${index+1}/`}>
									<h3>{item.name}</h3>
									<p>{item.description}</p>
									<img src={item.img} alt="img of game"/>
								</Link>
							</li>
						);
					})}
					
				</ul>
			</div>
		</div>
	);
}

export default Games;