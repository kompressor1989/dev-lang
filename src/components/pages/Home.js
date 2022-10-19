import React,{ useEffect, useState, useContext} from "react";
import {Link} from "react-router-dom";
import { MainContext } from "../Main";

function Home() {
	const [level, setLevel] = useState(0);
	const {points} = useContext(MainContext);

	useEffect(() => {
		addLevel();

		// eslint-disable-next-line react-hooks/exhaustive-deps		
	}, [points]);

	function addLevel() {
		let levelup = level;
		if(points > 1 && points <= 50) levelup = 1;
		else if(points > 50 && points <= 100) levelup = 2;
		else if(points > 100 && points <= 150) levelup = 3;
		else if(points > 150 && points <= 200) levelup = 4;
		else if(points > 200 && points <= 250) levelup = 5;
		else levelup = 0;
		setLevel(levelup)
	}

	return (
		<div className="page home__page">
			<div className="home__page_status">
				<span className="points">Points: {points}</span>
				<span className="level">Your Level: {level}</span>
			</div>
			<button className="btn__home">
				<Link to="/games/">Let's play a game!</Link>
			</button>
			
		</div>
	);
}

export default Home;