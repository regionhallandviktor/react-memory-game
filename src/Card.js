import React from "react";
import "./Card.css";

export default function Card(props) {
	let classes = ""
	let sizes = ""
	switch(props.pairCount) {
		case 4:
			sizes = "my-2 md:my-6 h-32 md:h-64";
			break
		case 8:
			sizes = " my-2 md:my-4 h-24 md:h-48";
			break
		case 16:
			sizes = " my-1 md:my-2 h-16 md:h-24";
			break
		default:
	}
	if(props.found) {
		classes = "card--found border-2 leading-8 md:text-5xl " + sizes
	} else if(props.revealed) {
		classes = "card--turned border-2 leading-8 md:text-5xl " + sizes
	} else {
		classes = "card border-2 leading-8 md:text-5xl " + sizes
	}

    return (
        <button
            onClick={() => {
                return props.clickHandler(props.id);
            }}
            className={classes}
        >
            {props.revealed ? props.text : ""}
        </button>
    );
}
