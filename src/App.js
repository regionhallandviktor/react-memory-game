import React, { useState } from "react";
import Card from "./Card";

function App() {
    const [nrOfPairs, setnrOfCards] = useState(6);
    const [cardStates, setCardStates] = useState(() => {
		let cards = [];
		let pair = 1;
        for (let i = 1; i < nrOfPairs + 1; i++) {
			cards.push({id: pair, pairId: i, revealed: false, found: false});
			pair++;
			cards.push({id: pair, pairId: i, revealed: false, found: false});
			pair++;
        }
        return cards;
    });
    let cardArray = [];
    console.log(cardStates);
    Object.entries(cardStates).map(([key, value]) => {
		console.log(key, value)
        cardArray.push(<Card key={key} id={value.id} pairId={value.pairId} revealed={value.revealed} found={value.found} />);
    });
    console.log(cardArray);

    return (
        <div className="grid grid-cols-4 gap-4 mx-auto max-w-6xl">
            {cardArray}
        </div>
    );
}

export default App;
