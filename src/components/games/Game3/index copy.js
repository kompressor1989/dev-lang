import { useEffect, useState } from 'react';

function Game3(props) {
	const [library, setLibrary] = useState([]);
	const [currentWord, setCurrentWord] = useState('');

	const [currentWordChars, setCurrentWordChars] = useState([]);
	const [resultWordChars, setResultWordChars] = useState([]);

	const {shuffleLibrary, addCorrect, addError, setCurrentIndex} = props.methods;
	const {currentIndex} = props.data;

	useEffect(() => {
		if (library.length === 0) {
			let libraryTmp = shuffleLibrary();

			if (libraryTmp && libraryTmp.length > 0) {
				setLibrary([...libraryTmp]);
			}
		} else {
			if (!currentWord) {
				setCurrentWord(library[currentIndex].translate);
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps		
	}, [library]);

	useEffect(() => {
		if (currentWordChars.length === 0 && currentWord) {
			setCurrentWordChars([...shuffleChars()]);
		}
		
		// eslint-disable-next-line react-hooks/exhaustive-deps		
	}, [currentWord]);

	useEffect(() => {
		if (library[currentIndex]) {
			setCurrentWord(library[currentIndex].translate);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps		
	}, [currentIndex]);

	useEffect(() => {
		if (currentWordChars.length === 0 && currentWord && resultWordChars.length === currentWord.length) {
			check();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentWordChars]);

	function check() {
		const resultWordCharsTmp = resultWordChars.join();

		if (resultWordCharsTmp === currentWord) addCorrect();
		else addError();

		next();
	}

	function shuffleChars() {
		let charsTmp = [];

		while(true) {
			if (charsTmp.length === currentWord.length) break;

			let index = Math.floor(Math.random() * currentWord.length);
			let char = currentWord[index];

			if (!charsTmp.includes(char)) charsTmp.push(char);
		}

		return charsTmp;
	}

	function next() {
		setResultWordChars([]);

		let currentIndexTmp = currentIndex;
		currentIndexTmp++;

		if (!library[currentIndexTmp]) {
			setCurrentIndex(0);
			return;
		};

		setCurrentIndex(currentIndexTmp);
	}
	
	function add(event) {
		let currentWordCharsTmp = currentWordChars;
		let resultWordCharsTmp = resultWordChars;

		let char = event.target.innerText;

		if (!char) return;

		resultWordCharsTmp.push(char);
		
		currentWordCharsTmp = currentWordCharsTmp.filter(item => item !== char);

		setCurrentWordChars(currentWordCharsTmp);
		setResultWordChars(resultWordCharsTmp);
	}

	return (
		<>
			<div>{resultWordChars.map((char, index) => {
				return <button key={index}>{char}</button>
			})}</div>
			<div>{currentWordChars.map((char, index) => {
				return <button onClick={add} key={index}>{char}</button>
			})}</div>
        </>
	);
}

export default Game3;