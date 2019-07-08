import { PokerPlayer } from '@/models/PokerPlayer';
import allCards from '@/constants/AllCards';
import { PokerService } from '@/services/PokerService';

export class PokerGame {
	public pokerPlayers: PokerPlayer[];
	public winners?: PokerPlayer[];
	private cards?: string[];

	constructor(names: string[]) {
		if (allCards.length / names.length < 5) {
			throw new Error('Too many players');
		}
		this.randomSortCards();
		this.pokerPlayers = names.map((name) => new PokerPlayer(name, this.generateRandomHand()));
		this.findWinners();
	}

	/**
	 * Generate new game
	 */
	public generateNewGame(): void {
		this.randomSortCards();
		this.pokerPlayers.forEach((player: PokerPlayer) =>
			player.switchCards(this.generateRandomHand())
		);
		this.findWinners();
	}

	/**
	 * Add player
	 * @param {string} name: name of new player
	 */
	public addPlayer(name: string): void {
		if (allCards.length / (this.pokerPlayers.length + 1) < 5) {
			throw new Error('It will have too many players in the game');
		}
		if (name.trim().length === 0) {
			throw new Error('Name is empty');
		}

		const filteredName = this.pokerPlayers.filter(
			(pokerPlayer: PokerPlayer) => pokerPlayer.name === name
		);
		if (filteredName.length > 0) {
			throw new Error('Name already exists');
		}
		this.pokerPlayers.push(new PokerPlayer(name, this.generateRandomHand()));
		this.findWinners();
	}

	/**
	 * Remove player
	 * @param {PokerPlayer} player : player to remove
	 */
	public removePlayer(player: PokerPlayer): void {
		const indexPlayer = this.pokerPlayers.findIndex(
			(pokerPlayer: PokerPlayer) => pokerPlayer === player
		);
		if (indexPlayer >= 0) {
			player.hand.cards.forEach((card) => {
				// @ts-ignore
				this.cards.push(`${card.value}${card.rank}`);
			});
			this.randomSortCards();
			this.pokerPlayers.splice(indexPlayer, 1);
		}
		this.findWinners();
	}

	/**
	 * Find winners
	 */
	private findWinners() {
		this.winners = PokerService.findWinners(this.pokerPlayers);
	}

	/**
	 * Sort cards randomly
	 */
	private randomSortCards(): void {
		this.cards = [...allCards];
		this.cards.sort(() => Math.random() - 0.5);
	}

	/**
	 * Generate random hand
	 */
	private generateRandomHand(): string {
		const cards = [];
		for (let i = 0; i < 5; i++) {
			// @ts-ignore
			const index = Math.floor(Math.random() * (this.cards.length - 1));
			// @ts-ignore
			cards.push(this.cards[index]);
			// @ts-ignore
			this.cards.splice(index, 1);
		}
		return cards.join(' ');
	}
}
