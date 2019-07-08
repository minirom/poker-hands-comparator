import { PokerHand } from '@/models/PokerHand';

export class PokerPlayer {
	public hand: PokerHand;

	constructor(public readonly name: string, cards: string) {
		this.hand = new PokerHand(cards);
	}

	public switchCards(cards: string) {
		this.hand = new PokerHand(cards);
	}
}
