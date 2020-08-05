import React from "react";

export default function Card(props) {
    return (
        <button
            onClick={() => {
                return props.clickHandler(props.id);
            }}
            className="border-2"
        >
            {props.revealed ? "Fisk" : "Visa"}
        </button>
    );
}
