import React from "react";
import Card from "./Card";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			revealed1: false,
			revealed2: false,
        };
        this.toggleRevealed = this.toggleRevealed.bind(this);
    }

    toggleRevealed(id) {
		let key = "revealed" + id
        this.setState({ [key]: !this.state[key] });
    }

    render() {
        return (
            <div className="grid grid-cols-4 gap-4 mx-auto max-w-6xl">
                <Card
					id='1'
                    revealed={this.state.revealed1}
                    clickHandler={this.toggleRevealed}
                />
				<Card
					id='2'
                    revealed={this.state.revealed2}
                    clickHandler={this.toggleRevealed}
                />
            </div>
        );
    }
}

export default App;
