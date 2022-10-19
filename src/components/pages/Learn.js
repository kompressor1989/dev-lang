import { useContext, useEffect, useState } from "react";
import { MainContext } from "../Main";

function Learn() {
	const {library} = useContext(MainContext);

	const [currentWord, setCurrentWord] = useState({});
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (library[currentIndex]) setCurrentWord(library[currentIndex]);
	}, [library, currentIndex]);

	function next() {
		let currentIndexTmp = currentIndex;
		currentIndexTmp++;

		if (!library[currentIndexTmp]) return;

		setCurrentIndex(currentIndexTmp);
	}
	
	return (
		<div className="page">
			<div className="learn__progressbar"><span style={{width: (library.length > 0 ? ((currentIndex+1)*100)/library.length : 0) + '%'}}></span></div>
			<div className="learn">
				{library.length > 0 &&
					<>
						<div className="learn__word">{currentWord.word}</div>
						<div className="learn__translate">{currentWord.translate}</div>
						<button onClick={next}>Next</button>
					</>
				}
				{library.length === 0 &&
					<>Library is empty!</>
				}
			</div>
		</div>
	);
}

export default Learn;