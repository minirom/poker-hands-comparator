import { PokerCard } from '@/models/PokerCard';

const WRONG_CARD_ERROR = 'Wrong card';

describe('PokerCard', () => {
	describe('constructor', () => {
		it('should throw error if wrong value', () => {
			expect(() => new PokerCard('WS')).toThrow(WRONG_CARD_ERROR);
		});
		it('should throw error if wrong suit', () => {
			expect(() => new PokerCard('2A')).toThrow(WRONG_CARD_ERROR);
		});
		it('should throw error if wrong too many arguments', () => {
			expect(() => new PokerCard('2H 2S')).toThrow(WRONG_CARD_ERROR);
		});

		it('should have value, suit and rank values', () => {
			const card = new PokerCard('2S');
			expect(card.value).toEqual('2');
			expect(card.suit).toEqual('S');
			expect(card.rank).toEqual(0);
		});
	});

	it('should stringify value', () => {
		expect(new PokerCard('2S').toString()).toEqual('2S');
		expect(new PokerCard('TS').toString()).toEqual('10S');
	});
});
