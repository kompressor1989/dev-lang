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
					<h2 className='learn__translate badge text-bg-info'>{currentWord}</h2>
					{voiceWord && <div>{voiceWord}</div>}
					<button className=' btn__voice btn btn-secondary' onClick={voice}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic" viewBox="0 0 16 16">
  					<path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
  					<path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"/>
					</svg></button>
					<button className='btn btn-info' onClick={next}>Skip it<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-compact-right" viewBox="0 0 16 16">
  					<path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
					</svg></button>
				</>
			}
        </>
	);
}

export default Game1;