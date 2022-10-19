import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Games from './pages/Games';
import Learn from './pages/Learn';
import Library from './pages/Library';
import Game from "./pages/Game";

export const MainContext = React.createContext();

function Main() {
	const libraryGames = [
		{ name: 'Speak and check', description: 'Say the word on the screen and check your spelling', img: '../img/Group.png' },
		{ name: 'Check the correct one', description: 'Say the word on the screen and check your spelling', img: '../img/Group2.png' },
		{ name: 'Check it', description: 'See the word abc at the screen and check your word writing', img: '../img/Group3.png' }
	];

	const [library, setLibrary] = useState([]);
	const [points, setPoints] = useState(0);

	useEffect(() => {
		if (!library || library.length === 0)  {
			const libraryLocal = getStorage();

			if (libraryLocal && libraryLocal.length > 0) {
				setLibrary([...libraryLocal]);
				setPoints(getStoragePoints());
			}
		} else {
			setStorage();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps		
	});

	useEffect(() => {
		setStorage();

		// eslint-disable-next-line react-hooks/exhaustive-deps		
	}, [points]);

	function setStorage() {
		let libraryTmp = library;
		libraryTmp = JSON.stringify(libraryTmp);

		if (!libraryTmp) return;

		localStorage.setItem('library', libraryTmp);
		localStorage.setItem('points', points);
	}

	function getStoragePoints() {
		let points = localStorage.getItem('points');
		
		if (isNaN(points)) return;

		return points;
	}

	function getStorage() {
		let libraryTmp = localStorage.getItem('library');
		
		if (!libraryTmp) return;

		libraryTmp = JSON.parse(libraryTmp);

		if (!libraryTmp) return;

		return libraryTmp;
	}

	return (
		<main className="main">
		<MainContext.Provider value={{library, setLibrary, libraryGames, points, setPoints}}>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/games/" element={<Games />} />
			<Route path="/learn/" element={<Learn />} />
			<Route path="/library/" element={<Library />} />
			<Route path="/games/:number/" element={<Game />} />
		</Routes>
		</MainContext.Provider>
		</main>
	);
}

export default Main;