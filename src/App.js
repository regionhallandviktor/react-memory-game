import React from "react";
import Card from "./Card";
import Deck from "./Deck";

var nrRevealed = 0;
var lookingForPair = 0;
var foundPairs = 0;
var nrOfPairs = 4;

class App extends React.Component {
    constructor(props) {
        super(props);
        let cards = Deck(nrOfPairs);
        this.state = {
            menuOpen: true,
            solved: false,
            cardStates: cards,
        };
        this.cardClick = this.cardClick.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({ menuOpen: !this.state.menuOpen });
        return;
    }

    restart(pairCount) {
        console.log("Restart triggered");
        nrRevealed = 0;
        lookingForPair = 0;
        foundPairs = 0;
        nrOfPairs = pairCount;
        let cards = Deck(pairCount); // Nya fräscha kort med alla default states
        this.setState({ cardStates: cards }); // Uppdatera state med de nya korten
        this.setState({ solved: false }); // Gick inte att uppdatera hela state-objektet på en gång så...
        this.setState({ menuOpen: false });
    }
    cardClick(id) {
        let cardArray = this.state.cardStates; // Tillfällig array med objekt för varje korts olika värden
        if (nrRevealed === 2) {
            // Vänd ned korten vid klick om två kort redan är uppe
            let shouldBeOpened = false; // Flagga för om ett klickat kort skall öppnas
            cardArray.forEach((element, index) => {
                if (!element.found) {
                    if (!element.revealed && index === id) {
                        shouldBeOpened = true;
                    } else {
                        element.revealed = false; // Sätt vänd-status till nedvänd på kort som inte ingår i hittade par
                    }
                }
            });
            if (shouldBeOpened) {
                cardArray[id].revealed = true;
                nrRevealed = 1;
                lookingForPair = cardArray[id].pairID;
            } else {
                nrRevealed = 0; // Uppdatera räknaren för antal uppvända kort.
            }
            this.setState({ cardStates: cardArray }); // Uppdatera state med data från tillfälig array
        } else if (nrRevealed === 0 && !cardArray[id].found) {
            cardArray[id].revealed = !cardArray[id].revealed; // Toggla statusen för uppvänt på rätt objekt i arrayen
            this.setState({ cardStates: cardArray }); // Uppdatera states med data från den tillfälliga arrayen
            cardArray[id].revealed ? (nrRevealed += 1) : (nrRevealed -= 1); // Öka eller minska räknare på antal uppvända kort
            lookingForPair = cardArray[id].pairID;
        } else if (nrRevealed === 1 && !cardArray[id].revealed) {
            cardArray[id].revealed = !cardArray[id].revealed; // Toggla statusen för uppvänt på rätt objekt i arrayen
            cardArray[id].revealed ? (nrRevealed += 1) : (nrRevealed -= 1); // Öka eller minska räknare på antal uppvända kort
            if (cardArray[id].pairID === lookingForPair) {
                // Hittat ett par - korten matchar
                cardArray.forEach((element) => {
                    // Gå igenom arrayen och markera som hittade
                    if (element.pairID === lookingForPair) {
                        element.found = true;
                    }
                });
                foundPairs += 1;
                if (foundPairs === nrOfPairs) {
                    this.setState({ solved: true });
                }
                nrRevealed = 0;
            }
            this.setState({ cardStates: cardArray }); // Uppdatera states med data från den tillfälliga arrayen
        }
    }

    render() {
        return (
            <>	<div className="flex justify-end"><button
                    onClick={this.toggleMenu}
                    className="border-2 border-black rounded-lg m-4 p-4 bg-gray-200"
                >
                    {this.state.menuOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-x"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-menu"
                        >
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    )}
                </button>
				</div>
                {this.state.menuOpen ? (
                    <div className="flex px-4 flex-wrap justify-center">
                        <button
                            className="border-2 border-orange-300 rounded-lg mt-4 p-4 bg-orange-200"
                            onClick={() => {
                                this.restart(4);
                            }}
                        >
                            Nytt spel (8 kort)
                        </button>
                        <button
                            className="border-2 mx-4 border-orange-300 rounded-lg mt-4 p-4 bg-orange-200"
                            onClick={() => {
                                this.restart(8);
                            }}
                        >
                            Nytt spel (16 kort)
                        </button>
                        <button
                            className="border-2 border-orange-300 rounded-lg mt-4 p-4 bg-orange-200"
                            onClick={() => {
                                this.restart(16);
                            }}
                        >
                            Nytt spel (32 kort)
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mx-auto mt-4 max-w-6xl">
                        {this.state.cardStates.map((current, index) => {
                            return (
                                <Card
                                    key={index}
                                    id={index}
                                    pairCount={nrOfPairs}
                                    revealed={
                                        this.state.cardStates[index].revealed
                                    }
                                    clickHandler={this.cardClick}
                                    text={this.state.cardStates[index].value}
                                    found={this.state.cardStates[index].found}
                                />
                            );
                        })}
                    </div>
                )}
            </>
        );
    }
}

export default App;
