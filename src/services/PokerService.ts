import { PokerPlayer } from '@/models/PokerPlayer';

export class PokerService {
	/**
	 * Find winners
	 * @param {Array<PokerPlayer>} players: players to compare
	 * @returns {Array<PokerPlayer>} winners of the game
	 */
	public static findWinners(players: PokerPlayer[]): PokerPlayer[] {
		const maxRank = Math.max(...players.map((player: PokerPlayer) => player.hand.rank), 0);
		return players.filter((player: PokerPlayer) => player.hand.rank === maxRank);
	}
}
