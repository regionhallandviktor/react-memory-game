import React from "react";
import Card from "./Card";
import Deck from "./Deck";
import IconClose from "./iconClose";
import IconMenu from "./iconMenu";
import Button from "./Button"
import SettingsScreen from "./SettingsScreen";

var lookingForPair;
var nrOfPairs = 4;
var moveAvailableToggle = true;

class App extends React.Component {
    constructor(props) {
        super(props);
        let cards = Deck(nrOfPairs);
        this.state = {
            menuOpen: true,
            cardStates: cards,
        };
        this.cardClick = this.cardClick.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.restart = this.restart.bind(this);
    }

    toggleMenu() {
        this.setState({ menuOpen: !this.state.menuOpen });
        return;
    }

    restart(pairCount) {
        lookingForPair = 0;
        moveAvailableToggle = true;
        nrOfPairs = pairCount;
        let cards = Deck(pairCount); // Nya fräscha kort med alla default states
        this.setState({ cardStates: cards }); // Uppdatera state med de nya korten
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
                        {this.state.menuOpen ? <IconClose /> : <IconMenu />}
                    </button>
                </div>
                {this.state.menuOpen ? (
                    <SettingsScreen>
                        <Button
                            clickHandler={this.restart}
                            text="Nytt spel (8 kort)"
							pairCount={4}
							extraClasses=""
                        />
                        <Button
                            clickHandler={this.restart}
                            text="Nytt spel (16 kort)"
							pairCount={8}
							extraClasses="mx-4"
                        />
                        <Button
                            clickHandler={this.restart}
                            text="Nytt spel (32 kort)"
							pairCount={16}
							extraClasses=""
                        />
                    </SettingsScreen>
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
