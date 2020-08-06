export default function Deck () {
	let rawCards = [
		{ revealed: false, pairID: 0, found: false, value: "Flundra" },
		{ revealed: false, pairID: 0, found: false, value: "Flundra" },
		{ revealed: false, pairID: 1, found: false, value: "Kotte" },
		{ revealed: false, pairID: 1, found: false, value: "Kotte" },
		{ revealed: false, pairID: 2, found: false, value: "Pinne" },
		{ revealed: false, pairID: 2, found: false, value: "Pinne" },
		{ revealed: false, pairID: 3, found: false, value: "Planka" },
		{ revealed: false, pairID: 3, found: false, value: "Planka" },
	];
	for (let i = rawCards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * i);
		const temp = rawCards[i];
		rawCards[i] = rawCards[j];
		rawCards[j] = temp;
	}
	return rawCards;
}