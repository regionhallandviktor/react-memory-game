import React from "react";
import './Card.css'

export default function Card(props) {

    return (
        <button
            onClick={() => {
                return props.clickHandler(props.id);
			}}
            className={props.revealed ? "card--turned border-2 leading-8 md:text-5xl my-8" : "card border-2 leading-8 md:text-5xl my-8" }
        >
            {props.revealed ? props.text : ""}
        </button>
    );
}
