import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { MainContext } from "../Main";


import Game1 from "../games/Game1";
import Game2 from "../games/Game2";
import Game3 from "../games/Game3";

const libraryComponents = [Game1, Game2, Game3];

function Game() {
	const params = useParams();

	const number = +params.number;

	const Component = libraryComponents[number - 1] || null;

	const {library, libraryGames, points, setPoints} = useContext(MainContext);

	const [errors, setErrors] = useState(0);
	const [correct, setCorrect] = useState(0);

	const [currentWord, setCurrentWord] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);

	const name = libraryGames[number - 1].name || '';

	useEffect(() => {
		if (library[currentIndex]) setCurrentWord(library[currentIndex].translate);

		// eslint-disable-next-line react-hooks/exhaustive-deps		
	}, [currentIndex]);

	function addError() {
		let count = errors;
		count++;

		setErrors(count);
	}

	function addCorrect() {
		let count = correct;
		count++;

		let countPoints = points;
		countPoints++;

		setCorrect(count);
		setPoints(countPoints);
	}

	function shuffleLibrary() {
		let libraryTmp = [];

		while(true) {
			if (libraryTmp.length === library.length) break;

			let index = Math.floor(Math.random() * library.length);
			let word = library[index];

			if (!libraryTmp.includes(word)) libraryTmp.push(word);
		}

		return libraryTmp;
	}

	return (
		<div className="page">
			<div className="learn__progressbar"><span style={{width: (library.length > 0 ? ((currentIndex+1)*100)/library.length : 0) + '%'}}></span></div>
			<div className="game">
				<div className="game__header">
					<Link to="/games/" className="btn__back"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 16 16">
  					<path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
					</svg>Go Back</Link>
					<div className="game__header_info">
						<span className="errors ">Errors: {errors}</span>
						<span className="correct ">Correct: {correct}</span>
						<span className="points ">Points: {points}</span>
					</div>
				</div>
				<div className="game__content">
					{name && <h3>{name}</h3>}
					{!Component ? <>Game not found</> : <Component data={{currentIndex, currentWord}} methods={{shuffleLibrary, addCorrect, addError, setCurrentIndex, setCurrentWord}} />}
				</div>
			</div>
        </div>
	);
}

export default Game;