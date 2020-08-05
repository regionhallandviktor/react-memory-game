import React from "react";
import Card from "./Card";

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
        this.toggleRevealed = this.toggleRevealed.bind(this);
    }

    toggleRevealed(id) {
        console.log("Funktionen toggle revealed i app har kört");
        let cardArray = this.state.cardStates;
        cardArray[id].revealed = !cardArray[id].revealed;
        this.setState({ cardStates: cardArray });
    }

    render() {
        return (
            <div className="grid grid-cols-4 gap-4 mx-auto mt-4 max-w-6xl">
				{
					this.state.cardStates.map((current, index) => {
						return <Card 
						key={index}
						id={index}
						revealed={this.state.cardStates[index].revealed}
						clickHandler={this.toggleRevealed}
						text={this.state.cardStates[index].value}/>
					})
				}
            </div>
        );
    }
}

export default App;
