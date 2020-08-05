import React from "react";
import Card from "./Card";

class App extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			cardStates: [
				{id: 1, pairID: 1, revealed: false, found: false},
				{id: 2, pairID: 1, revealed: false, found: false},
				{id: 3, pairID: 2, revealed: false, found: false},
				{id: 4, pairID: 2, revealed: false, found: false},
				{id: 5, pairID: 3, revealed: false, found: false},
				{id: 6, pairID: 3, revealed: false, found: false},
				{id: 7, pairID: 4, revealed: false, found: false},
				{id: 8, pairID: 4, revealed: false, found: false},
				{id: 9, pairID: 5, revealed: false, found: false},
				{id: 10, pairID: 5, revealed: false, found: false},
				{id: 11, pairID: 6, revealed: false, found: false},
				{id: 12, pairID: 6, revealed: false, found: false},
			]
		}
		this.toggleRevealed = this.toggleRevealed.bind(this)
	}

	toggleRevealed (key) {
		console.log("Toggle revealed")
		console.log(key)
	}

	render () {
		return (
			<div className="grid grid-cols-4 gap-4 mx-auto max-w-6xl">
            {this.state.cardStates.map((current, index) => {
				return (
					<Card key={index} pairID={current.pairID} revealed={current.revealed} found={current.found} value={current.pairID} clickHandler={this.toggleRevealed} />
				)
			})}
        </div>
		)
	}
}

export default App;
