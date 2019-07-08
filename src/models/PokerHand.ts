import { PokerCard } from '@/models/PokerCard';
import { PokerRanks } from '@/enums/PokerRanks';

const SPACE = ' ';

const WEIGHT = [1000, 20, 1, 0.01, 0.0001];

export class PokerHand {
	public readonly cards: PokerCard[];
	public readonly rank: number;
	public readonly suits: string[];
	private readonly occurences: Map<number, number>;

	constructor(cards: string) {
		if (!RegExp(/([2-9TJQKA]{1}[SHDC]{1}\s){4}([2-9TJQKA]{1}[SHDC]{1}){1}$/).test(cards)) {
			throw new Error('Wrong hand');
		}
		this.cards = cards
			.split(SPACE)
			.map((cardValue: string) => new PokerCard(cardValue))
			.sort()
			.sort((cardA: PokerCard, cardB: PokerCard) => cardA.rank - cardB.rank);

		this.suits = this.cards
			.map((card) => card.suit)
			.filter((value, index, array) => array.indexOf(value) === index)
			.sort();

		this.occurences = new Map<number, number>();
		this.countOccurrences();

		this.rank = this.computeRank();
	}

	/**
	 * Check if hand is flush
	 * @returns {boolean} true if flush, false otherwise
	 */
	public isFlush(): boolean {
		return this.suits.length === 1;
	}

	/**
	 * Check if hand is straight
	 * @returns {boolean} true if straight, false otherwise
	 */
	public isStraight(): boolean {
		for (let i = 1; i < this.cards.length; i++) {
			if (this.cards[i].rank - 1 !== this.cards[i - 1].rank) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Check if hand has an ace
	 * @returns {boolean} true if contains ace, false otherwise
	 */
	public hasAce(): boolean {
		return this.cards.map((card: PokerCard) => card.value).includes('A');
	}

	/**
	 * Check if hand is straight flush
	 * @returns {boolean} true if straight flush, false otherwise
	 */
	public isStraightFlush(): boolean {
		return this.isFlush() && this.isStraight();
	}

	/**
	 * Check if hand is royal flush
	 * @returns {boolean} true if royal flush, false otherwise
	 */
	public isRoyalFlush(): boolean {
		return this.isStraightFlush() && this.hasAce();
	}

	/**
	 * Check if hand is four of a kind
	 * @returns {boolean} true if four of a kind, false otherwise
	 */
	public isFourOfAKind(): boolean {
		return this.occurences.size === 2 && Math.max(...Array.from(this.occurences.values()), 0) === 4;
	}

	/**
	 * Check if hand is full house
	 * @returns {boolean} true if full house, false otherwise
	 */
	public isFullHouse(): boolean {
		return this.isThreeOfAKind() && this.occurences.size === 2;
	}

	/**
	 * Check if hand is three of a kind
	 * @returns {boolean} true if three of a kind, false otherwise
	 */
	public isThreeOfAKind(): boolean {
		return Math.max(...Array.from(this.occurences.values()), 0) === 3;
	}

	/**
	 * Check if hand has two pairs
	 * @returns {boolean} true if two pairs, false otherwise
	 */
	public isTwoPairs(): boolean {
		return this.hasPair() && this.occurences.size === 3;
	}

	/**
	 * Check if hand is pair
	 * @returns {boolean} true if flush, false otherwise
	 */
	public isPair(): boolean {
		return this.hasPair() && this.occurences.size === 4;
	}

	public toString(): string {
		return this.cards.join(', ');
	}

	/**
	 * Check if hand has a pair
	 * @returns {boolean} true if contains a pair, false otherwise
	 */
	private hasPair(): boolean {
		return Math.max(...Array.from(this.occurences.values()), 0) === 2;
	}

	/**
	 * Compute a rank of the hand to be able to know if the is hand wins
	 * @returns {number} rank of the hand
	 */
	private computeRank(): number {
		if (this.isRoyalFlush()) {
			return PokerRanks.ROYAL_FLUSH;
		}
		if (this.isStraightFlush()) {
			return PokerRanks.STRAIGHT_FLUSH + this.cards[4].rank;
		}
		if (this.isFourOfAKind()) {
			return PokerRanks.FOUR_OF_A_KIND + this.computeHigherCardsRank();
		}
		if (this.isFullHouse()) {
			return PokerRanks.FULL_HOUSE + this.computeHigherCardsRank();
		}
		if (this.isFlush()) {
			return PokerRanks.FLUSH + this.computeHigherCardsRank();
		}
		if (this.isStraight()) {
			return PokerRanks.STRAIGHT + this.cards[4].rank;
		}
		if (this.isThreeOfAKind()) {
			return PokerRanks.THREE_OF_A_KIND + this.computeHigherCardsRank();
		}
		if (this.isTwoPairs()) {
			return PokerRanks.TWO_PAIRS + this.computeHigherCardsRank();
		}
		if (this.isPair()) {
			return PokerRanks.PAIR + this.computeHigherCardsRank();
		}

		return PokerRanks.HIGH_CARD + this.computeHigherCardsRank();
	}

	/**
	 * Count occurrences of each cards
	 */
	private countOccurrences(): void {
		this.cards.forEach((card: PokerCard) => {
			const occurences = this.occurences.get(card.rank);
			if (occurences) {
				this.occurences.set(card.rank, occurences + 1);
			} else {
				this.occurences.set(card.rank, 1);
			}
		});
	}

	/**
	 * Compute rank by giving a weight for best cards
	 * @returns {number} rank from higher cards
	 */
	private computeHigherCardsRank(): number {
		const values = Array.from(this.occurences).sort((a, b) => b[1] - a[1]);
		return values
			.map((value, index) => value[0] * value[1] * WEIGHT[index])
			.reduce((acc, value) => acc + value, 0);
	}
}
