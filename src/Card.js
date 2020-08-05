import React from "react";

export default function Card({ revealed, key, value, clickHandler }) {
    return <button onClick={clickHandler(key)} className="border-2">{revealed ? value : 'Visa'}</button>;
}
