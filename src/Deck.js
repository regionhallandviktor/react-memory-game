export default function Deck (pairCount) {
	let rawCards = [];
	let words = ['Flundra', 'Kotte', 'Pinne', 'Planka', 'Sten', 'Mossa', 'Träd', 'Stubbe', 'Blåbär', 'Lingon', 'Svamp', 'Älg', 'Hare', 'Kanin', 'Mus', 'Ekorre']
	words = shuffleArray(words);
	for (let i = 0; i < pairCount; i++) {
		rawCards.push(
			{ revealed: false, pairID: i, found: false, value: words[i]},
			{ revealed: false, pairID: i, found: false, value: words[i] }
		);
	}
	rawCards = shuffleArray(rawCards);
	return rawCards;
}

function shuffleArray(input) {
	for (let i = input.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * i);
		const temp = input[i];
		input[i] = input[j];
		input[j] = temp;
	}
	return input
}