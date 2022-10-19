import { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../Main";

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
									<div className="games__item_two">
										<h3>{item.name}</h3>
										<p>{item.description}</p>
									</div>
									<div className="games__item_one">
										<img src={item.img} alt="img of game"/>
									</div>
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