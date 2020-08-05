import React from "react";
import Card from "./Card";

var nrRevealed = 0;
var lookingForPair = 0;
class App extends React.Component {
    constructor(props) {
        super(props);
        let cards = this.setupCards();
        this.state = {
            solved: false,
            cardStates: cards,
        };
        this.cardClick = this.cardClick.bind(this);
        this.setupCards = this.setupCards.bind(this);
        this.restart = this.restart.bind(this);
    }
    setupCards() {
        let rawCards = [
            { revealed: false, pairID: 0, found: false, value: "Flundra" },
            { revealed: false, pairID: 0, found: false, value: "Flundra" },
            { revealed: false, pairID: 1, found: false, value: "Kotte" },
            { revealed: false, pairID: 1, found: false, value: "Kotte" },
            { revealed: false, pairID: 2, found: false, value: "Pinne" },
            { revealed: false, pairID: 2, found: false, value: "Pinne" },
            { revealed: false, pairID: 3, found: false, value: "Planka" },
            { revealed: false, pairID: 3, found: false, value: "Planka" },
        ];
        for (let i = rawCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = rawCards[i];
            rawCards[i] = rawCards[j];
            rawCards[j] = temp;
        }
        return rawCards;
    }

    restart() {
        console.log("Restart");
        nrRevealed = 0;
        lookingForPair = 0;
        let cards = this.setupCards();
        this.setState({ cardStates: cards });
    }
    cardClick(id) {
        let cardArray = this.state.cardStates; // Tillfällig array med objekt för varje korts olika värden
        if (nrRevealed === 2) {
            // Vänd ned korten vid klick om två kort redan är uppe
            cardArray.forEach((element) => {
                if (!element.found) {
                    element.revealed = false;
                } // Sätt vänd-status till nedvänd på kort som inte ingår i hittade par
            });
            this.setState({ cardStates: cardArray }); // Uppdatera state med data från tillfälig array
            nrRevealed = 0; // Uppdatera räknaren för antal uppvända kort.
        } else if (nrRevealed === 0 && !cardArray[id].found) {
            cardArray[id].revealed = !cardArray[id].revealed; // Toggla statusen för uppvänt på rätt objekt i arrayen
            this.setState({ cardStates: cardArray }); // Uppdatera states med data från den tillfälliga arrayen
            cardArray[id].revealed ? (nrRevealed += 1) : (nrRevealed -= 1); // Öka eller minska räknare på antal uppvända kort
            lookingForPair = cardArray[id].pairID;
        } else if (nrRevealed === 1 && !cardArray[id].revealed) {
            cardArray[id].revealed = !cardArray[id].revealed; // Toggla statusen för uppvänt på rätt objekt i arrayen
            cardArray[id].revealed ? (nrRevealed += 1) : (nrRevealed -= 1); // Öka eller minska räknare på antal uppvända kort
            if (cardArray[id].pairID === lookingForPair) {
                // Kontrollera om korten matchar
                cardArray.forEach((element) => {
                    // Gå igenom arrayen och markera paret som hittade
                    if (element.pairID === lookingForPair) {
                        element.found = true;
                    }
                });
                // TODO: Om det är 0 kort med found: false - sätt solved till true

                nrRevealed = 0;
            }
            this.setState({ cardStates: cardArray }); // Uppdatera states med data från den tillfälliga arrayen
        }
    }

    render() {
        return (
            <>
                <div className="grid grid-cols-4 gap-4 mx-auto mt-4 max-w-6xl">
                    {this.state.cardStates.map((current, index) => {
                        return (
                            <Card
                                key={index}
                                id={index}
                                revealed={this.state.cardStates[index].revealed}
                                clickHandler={this.cardClick}
                                text={this.state.cardStates[index].value}
                            />
                        );
                    })}
                    {this.state.solved && <div>Grattis!</div>}
                </div>
				<div className="flex">
					<button
						className="mx-auto border-2 border-gray p-4 bg-orange-300"
						onClick={() => {
							this.restart();
						}}
					>
						Börja om
					</button>
				</div>
            </>
        );
    }
}

export default App;
