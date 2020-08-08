import React from "react";

export default function (props) {
	let classes = "border-2 border-orange-300 rounded-lg mt-4 p-4 bg-orange-200 " + props.extraClasses
    return (
        <button
            className={classes}
            onClick={() => {
                props.clickHandler(props.pairCount);
            }}
        >
            {props.text}
        </button>
    );
}
