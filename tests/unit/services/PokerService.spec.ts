import { PokerPlayer } from '@/models/PokerPlayer';
import { PokerService } from '@/services/PokerService';

describe('PokerService', () => {
	describe('royal flush winners', () => {
		it('should give two players winners with a royal flush vs straight flush', () => {
			const player1 = new PokerPlayer('1', 'AS KS QS JS TS');
			const player2 = new PokerPlayer('2', 'AD KD QD JD TD');
			const player3 = new PokerPlayer('3', 'AH KH QH JH TC');

			const winners = PokerService.findWinners([player1, player2, player3]);
			expect(winners.length).toEqual(2);
			expect(winners[0]).toEqual(player1);
			expect(winners[1]).toEqual(player2);
		});
	});
	describe('straight flush winners', () => {
		it('should give two players winners with a straight flush vs four of a kind', () => {
			const player1 = new PokerPlayer('1', '9S KS QS JS TS');
			const player2 = new PokerPlayer('2', '9D KD QD JD TD');
			const player3 = new PokerPlayer('3', 'AH AS AC AD TC');

			const winners = PokerService.findWinners([player1, player2, player3]);
			expect(winners.length).toEqual(2);
			expect(winners[0]).toEqual(player1);
			expect(winners[1]).toEqual(player2);
		});
		it('should give best straight flush winner', () => {
			const player1 = new PokerPlayer('1', '9S KS QS JS TS');
			const player2 = new PokerPlayer('2', '9D 8D QD JD TD');
			const player3 = new PokerPlayer('3', 'AH AS AC AD TC');

			const winners = PokerService.findWinners([player1, player2, player3]);
			expect(winners.length).toEqual(1);
			expect(winners[0]).toEqual(player1);
		});
	});
	describe('four of a kind winners', () => {
		it('should give best four of a kind winner', () => {
			const player1 = new PokerPlayer('1', 'QH QS QC TS TH');
			const player2 = new PokerPlayer('2', 'KH KS KC KD TD');
			const player3 = new PokerPlayer('3', 'AH AS AC AD TC');

			const winners = PokerService.findWinners([player1, player2, player3]);
			expect(winners.length).toEqual(1);
			expect(winners[0]).toEqual(player3);
		});
	});
	describe('full house winners', () => {
		it('should give best full house', () => {
			const player1 = new PokerPlayer('1', 'QH QS QC TS TH');
			const player2 = new PokerPlayer('2', 'KH KS KC 9D 9S');
			const player3 = new PokerPlayer('3', '2S 5S 7S 8S 9S');

			const winners = PokerService.findWinners([player1, player2, player3]);
			expect(winners.length).toEqual(1);
			expect(winners[0]).toEqual(player2);
		});
	});
	describe('flush winners', () => {
		it('should give best flush', () => {
			const player1 = new PokerPlayer('1', '3H 5H 7H 8H 9H');
			const player2 = new PokerPlayer('2', '2C 3C 4H 5D 6S');
			const player3 = new PokerPlayer('3', '2S 5S 7S 8S 9S');

			const winners = PokerService.findWinners([player1, player2, player3]);
			expect(winners.length).toEqual(1);
			expect(winners[0]).toEqual(player1);
		});
	});
	describe('straight winners', () => {
		it('should give best straight', () => {
			const player1 = new PokerPlayer('1', '3H 4C 5S 6D 7D');
			const player2 = new PokerPlayer('2', '2C 3C 4H 5D 6S');
			const player3 = new PokerPlayer('3', 'AS AD AH QH KC');

			const winners = PokerService.findWinners([player1, player2, player3]);
			expect(winners.length).toEqual(1);
			expect(winners[0]).toEqual(player1);
		});
	});
	describe('three of a kind winners', () => {
		it('should give best three of a kind', () => {
			const player1 = new PokerPlayer('1', '7H 7S 7D KC QS');
			const player2 = new PokerPlayer('2', '8H 8S 8D AS KS');
			const player3 = new PokerPlayer('3', 'AC AD KD KH QS');

			const winners = PokerService.findWinners([player1, player2, player3]);
			expect(winners.length).toEqual(1);
			expect(winners[0]).toEqual(player2);
		});
	});
	describe('two pairs winners', () => {
		it('should give best two pairs', () => {
			const player1 = new PokerPlayer('1', 'AS AD QH QC KC');
			const player2 = new PokerPlayer('2', 'AC AH KH KS QD');
			const player3 = new PokerPlayer('3', 'QC QH JS TC 9D');

			const winners = PokerService.findWinners([player1, player2, player3]);
			expect(winners.length).toEqual(1);
			expect(winners[0]).toEqual(player2);
		});
	});
	describe('pair winners', () => {
		it('should give best pair', () => {
			const player1 = new PokerPlayer('1', '2S 3C 8H AS KC');
			const player2 = new PokerPlayer('2', 'JC JH TS 9C 8S');
			const player3 = new PokerPlayer('3', 'QC QH JS TC 9D');

			const winners = PokerService.findWinners([player1, player2, player3]);
			expect(winners.length).toEqual(1);
			expect(winners[0]).toEqual(player3);
		});
	});
	describe('higher cards winners', () => {
		it('should give best higher cards', () => {
			const player1 = new PokerPlayer('1', '2S 3C 8H AS KC');
			const player2 = new PokerPlayer('2', '9S JH QC AC 2H');
			const player3 = new PokerPlayer('3', 'TS JD QD AH 2C');

			const winners = PokerService.findWinners([player1, player2, player3]);
			expect(winners.length).toEqual(1);
			expect(winners[0]).toEqual(player3);
		});
	});
});
