import React from "react";
import "./Card.css";

export default function Card(props) {
	let classes = ""
	if(props.found) {
		classes = "card--found border-2 leading-8 md:text-5xl my-2 md:my-6 h-32 md:h-64"
	} else if(props.revealed) {
		classes = "card--turned border-2 leading-8 md:text-5xl my-2 md:my-6 h-32 md:h-64"
	} else {
		classes = "card border-2 leading-8 md:text-5xl my-2 md:my-6 h-32 md:h-64"
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
