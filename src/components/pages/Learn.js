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
						<div className="learn__word badge text-bg-primary">{currentWord.word}</div>
						<div className="learn__translate badge text-bg-info">{currentWord.translate}</div>
						<button className="btn btn-info"  onClick={next}>Next <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
  						<path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
						</svg></button>
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