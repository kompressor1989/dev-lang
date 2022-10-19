import { useEffect, useState } from 'react';
import './style.css';

function Game1(props) {
	const {shuffleLibrary, addCorrect, addError, setCurrentIndex, setCurrentWord} = props.methods;
	const {currentIndex, currentWord} = props.data;

	const [library, setLibrary] = useState([]);
	const [voiceWord, setVoiceWord] = useState('');

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
		if (check() === true) {
			addCorrect();
			next();
		}

		if (check() === false) addError();

		// eslint-disable-next-line react-hooks/exhaustive-deps		
	}, [voiceWord]);

	function next() {
		setVoiceWord('');

		let currentIndexTmp = currentIndex;
		currentIndexTmp++;

		if (!library[currentIndexTmp]) {
			setCurrentIndex(0);
			return;
		};

		setCurrentIndex(currentIndexTmp);
	}

	function check() {
		if (!currentWord || !voiceWord) return null;

		if (currentWord.toLowerCase() === voiceWord.toLowerCase()) return true;

		return false;
	}

	function voice() {		
		let SpeechRecognition = new (
			window.SpeechRecognition || 
			window.webkitSpeechRecognition || 
			window.mozSpeechRecognition || 
			window.msSpeechRecognition)();

		SpeechRecognition.lang = 'en-EN';

		SpeechRecognition.onresult = function(event){
			let word = event.results[0][0].transcript;

			if (!word) return;
			
			setVoiceWord(word);
		};

		SpeechRecognition.onend = function(){
			SpeechRecognition.stop();
		};

		SpeechRecognition.start();
	}

	return (
		<>
            {currentWord &&
				<>
					<h2>{currentWord}</h2>
					{voiceWord && <div>{voiceWord}</div>}
					<button onClick={voice}>Voice</button>
					<button onClick={next}>Skip it</button>
				</>
			}
        </>
	);
}

export default Game1;