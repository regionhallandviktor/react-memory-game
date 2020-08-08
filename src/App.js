import React from "react";
import Card from "./Card";
import Deck from "./Deck";
import IconClose from "./iconClose"
import IconMenu from "./iconMenu"

var lookingForPair;
var nrOfPairs = 4;
var moveAvailableToggle = true;

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
        lookingForPair = 0;
        moveAvailableToggle = true;
        nrOfPairs = pairCount;
        let cards = Deck(pairCount); // Nya fräscha kort med alla default states
        this.setState({ cardStates: cards }); // Uppdatera state med de nya korten
        this.setState({ solved: false }); // Gick inte att uppdatera hela state-objektet på en gång så...
        this.setState({ menuOpen: false });
    }

    legalMove(cardArray, id) {
        let legalityVerdict = false;
        if (!cardArray[id].found && !cardArray[id].revealed) {
            legalityVerdict = true;
        }
        return legalityVerdict;
    }

    turnRevealedCards(cards) {
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].revealed && !cards[i].found) {
                cards[i].revealed = false;
            }
        }
        return cards;
    }

    cardClick(id) {
        let cardArray = this.state.cardStates; // Tillfällig array med objekt för varje korts olika värden
        if (moveAvailableToggle && this.legalMove(cardArray, id)) {
            cardArray = this.turnRevealedCards(cardArray); // Vänd ned tidigare uppvända kort
            cardArray[id].revealed = true; // Vänd upp valt kort
            moveAvailableToggle = false; // Ett av de två dragen är gjort
            lookingForPair = cardArray[id].pairID; // Vi letar efter ett nytt par
        } else if (this.legalMove(cardArray, id)) {
            cardArray[id].revealed = true; // Vänd upp valt kort
            moveAvailableToggle = true; // Två drag tillgängliga igen
            if (cardArray[id].pairID === lookingForPair) {
                // Markera båda korten i paret som hittade
                for (let i = 0; i < cardArray.length; i++) {
                    if (cardArray[i].pairID === lookingForPair) {
                        cardArray[i].found = true;
                    }
                }
            }
        }
        this.setState({ cardStates: cardArray });
    }

    render() {
        return (
            <>
                {" "}
                <div className="flex justify-end">
                    <button
                        onClick={this.toggleMenu}
                        className="border-2 border-black rounded-lg m-4 p-4 bg-gray-200"
                    >
                        {this.state.menuOpen ? (
                            <IconClose />
                        ) : (
                            <IconMenu />
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
