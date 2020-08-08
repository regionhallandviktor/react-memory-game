import React from "react";
import Button from './Button'

export default function SettingsScreen(props) {
    return (
        <div className="flex px-4 flex-wrap justify-center">
			{props.children}
        </div>
    );
}
