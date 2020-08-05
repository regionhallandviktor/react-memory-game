import React from "react";
import './Card.css'

export default function Card(props) {
    return (
        <button
            onClick={() => {
                return props.clickHandler(props.id);
            }}
            className="border-2 leading-8 text-5xl"
        >
            {props.revealed ? props.text : ""}
        </button>
    );
}
