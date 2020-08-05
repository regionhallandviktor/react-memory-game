import React from "react";
import Card from "./Card";

var nrRevealed = 0;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardStates: [
                { revealed: false, pairID: 0, found: false, value: "Flundra" },
                { revealed: false, pairID: 0, found: false, value: "Flundra" },
                { revealed: false, pairID: 1, found: false, value: "Kotte" },
                { revealed: false, pairID: 1, found: false, value: "Kotte" },
            ],
        };
        this.cardClick = this.cardClick.bind(this);
    }

    cardClick(id) {
        console.log("Funktionen card click i app har kört");
        let cardArray = this.state.cardStates; // Tillfällig array med objekt för varje korts olika värden
        if (nrRevealed === 2) {	// Vänd ned alla kort vid klick om två kort redan är uppe
            cardArray.forEach((element) => {		
                if(!element.found) { element.revealed = false; }// Sätt vänd-status till nedvänd i tillfällig array
			});
			this.setState({ cardStates: cardArray });	// Uppdatera state med data från tillfälig array
            nrRevealed = 0;	// Uppdatera räknaren för antal uppvända kort.
        } else {
            cardArray[id].revealed = !cardArray[id].revealed; // Toggla statusen för uppvänt på rätt objekt i arrayen
            this.setState({ cardStates: cardArray }); // Uppdatera states med data från den tillfälliga arrayen
            cardArray[id].revealed ? (nrRevealed += 1) : (nrRevealed -= 1); // Öka eller minska räknare på antal uppvända kort
        }	
    }

    render() {
        return (
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
            </div>
        );
    }
}

export default App;
