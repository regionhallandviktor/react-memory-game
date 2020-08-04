import React from "react";

export default function Card({ value, revealed }) {
	function toggleReveal(e) {
		console.log(e)
	}
    return <button className="border-2" onClick={toggleReveal}>{revealed ? value : 'Visa'}</button>;
}
