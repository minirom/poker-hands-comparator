import CardRanks from '@/constants/CardRanks';

export class PokerCard {
	public readonly value: string;
	public readonly suit: string;
	public readonly rank: number;

	constructor(card: string) {
		if (card.length > 2 || !RegExp(/[2-9TJQKA]{1}[SHDC]{1}$/).test(card)) {
			throw new Error('Wrong card');
		}
		this.value = card[0];
		this.suit = card[1];
		this.rank = CardRanks.indexOf(this.value);
	}

	public toString(): string {
		return `${this.value === 'T' ? 10 : this.value}${this.suit}`;
	}
}
