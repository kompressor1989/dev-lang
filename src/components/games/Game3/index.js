import { useEffect, useState } from 'react';

function Game3(props) {
	const {shuffleLibrary, addCorrect, addError, setCurrentIndex, setCurrentWord} = props.methods;
	const {currentIndex, currentWord} = props.data;

	const [library, setLibrary] = useState([]);

	const [currentWordChars, setCurrentWordChars] = useState([]);
	const [resultWordChars, setResultWordChars] = useState([]);

	useEffect(() => {
		const libraryTmp = shuffleLibrary();

		if (libraryTmp && libraryTmp.length > 0) {
			if (library && library.length === 0) {
				setLibrary([...libraryTmp]);
			}
		}

		if (library && library.length > 0) setCurrentWord(library[currentIndex].translate);	
	});

	useEffect(() => {
		if (currentWord && currentWordChars.length === 0) {
			setCurrentWordChars([...shuffleChars()]);
		}
		
		// eslint-disable-next-line react-hooks/exhaustive-deps		
	}, [currentWord]);

	useEffect(() => {
		if (library[currentIndex]) {
			setCurrentWord(library[currentIndex].translate);
			setResultWordChars([]);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps		
	}, [currentIndex]);

	useEffect(() => {
		if (currentWordChars && currentWordChars.length === 0) {
			check();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentWordChars]);

	function check() {
		const resultWordCharsTmp = resultWordChars.join('');

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
				return <button className='badge text-bg-info' key={index}>{char}</button>
			})}</div>
			<div className='current__word'>{currentWordChars.map((char, index) => {
				return <button className='btn__current' onClick={add} key={index}>{char}</button>
			})}</div>
        </>
	);
}

export default Game3;