import { PokerHand } from '@/models/PokerHand';
import { PokerCard } from '@/models/PokerCard';

const WRONG_HAND_ERROR = 'Wrong hand';

describe('PokerHand', () => {
	describe('constructor', () => {
		it('should throw error if wrong hand: only one card', () => {
			expect(() => new PokerHand('2S')).toThrow(WRONG_HAND_ERROR);
		});
		it('should throw error if wrong hand: only two cards', () => {
			expect(() => new PokerHand('2S 9H')).toThrow(WRONG_HAND_ERROR);
		});
		it('should throw error if wrong hand: only three cards', () => {
			expect(() => new PokerHand('2S 9H AD')).toThrow(WRONG_HAND_ERROR);
		});
		it('should throw error if wrong hand: only four cards', () => {
			expect(() => new PokerHand('2S 9H AD KC')).toThrow(WRONG_HAND_ERROR);
		});
		it('should create hand with cards', () => {
			const hand = new PokerHand('2S 9H AD KC AC');
			hand.cards.forEach((card) => {
				expect(card).toBeInstanceOf(PokerCard);
			});
		});
		it('should sort cards in hand', () => {
			const { cards } = new PokerHand('9H 7D AC 2S KC');

			expect(cards[0].value).toEqual('2');
			expect(cards[1].value).toEqual('7');
			expect(cards[2].value).toEqual('9');
			expect(cards[3].value).toEqual('K');
			expect(cards[4].value).toEqual('A');
		});
		it('should have suits', () => {
			const { suits } = new PokerHand('9S 7H AD 2C KC');

			const expectedSuit = ['S', 'H', 'D', 'C'];
			expectedSuit.map((suit) => {
				expect(suits.includes(suit)).toBeTruthy();
			});
		});
	});

	describe('isFlush', () => {
		it('should have only one kind of suit : flush', () => {
			const hand = new PokerHand('9S 7S AS 2S KS');

			expect(hand.suits.length).toEqual(1);
			expect(hand.suits[0]).toEqual('S');
			expect(hand.isFlush()).toBeTruthy();
		});
		it('should have only two kind of suits : no flush', () => {
			const hand = new PokerHand('9C 7S AS 2S KS');

			expect(hand.suits.length).toEqual(2);
			expect(hand.suits[0]).toEqual('C');
			expect(hand.suits[1]).toEqual('S');
			expect(hand.isFlush()).toBeFalsy();
		});
	});

	describe('isStraight', () => {
		it('should be straight: 5 6 7 8 9', () => {
			const hand = new PokerHand('9S 7S 6S 8C 5S');
			expect(hand.isStraight()).toBeTruthy();
		});
		it('should not be straight: 4 6 7 8 9', () => {
			const hand = new PokerHand('9S 7S 6S 8C 4S');
			expect(hand.isStraight()).toBeFalsy();
		});
	});

	describe('hasAce', () => {
		it('should have ace: 5 6 7 8 A', () => {
			const hand = new PokerHand('AS 7S 6S 8C 5S');
			expect(hand.hasAce()).toBeTruthy();
		});
		it('should not have ace: 4 6 7 8 9', () => {
			const hand = new PokerHand('9S 7S 6S 8C 4S');
			expect(hand.hasAce()).toBeFalsy();
		});
	});

	describe('isStraightFlush', () => {
		it('should be straight flush', () => {
			const hand = new PokerHand('9S KS QS JS TS');
			expect(hand.isStraightFlush()).toBeTruthy();
		});
		it('should not be straight flush: no flush', () => {
			const hand = new PokerHand('AC KS QS JS TS');
			expect(hand.isStraightFlush()).toBeFalsy();
		});
		it('should not be straight flush: no straight', () => {
			const hand = new PokerHand('8S 9S 6S JS TS');
			expect(hand.isStraightFlush()).toBeFalsy();
		});
	});

	describe('isRoyalFlush', () => {
		it('should be royal flush', () => {
			const hand = new PokerHand('AS KS QS JS TS');
			expect(hand.isRoyalFlush()).toBeTruthy();
		});
		it('should not be royal flush: no flush', () => {
			const hand = new PokerHand('AH KH QH JH TC');
			expect(hand.isRoyalFlush()).toBeFalsy();
		});
		it('should not be royal flush: no straight', () => {
			const hand = new PokerHand('AS 9S QS JS TS');
			expect(hand.isRoyalFlush()).toBeFalsy();
		});
		it('should not be royal flush: no ace', () => {
			const hand = new PokerHand('9S KS QS JS TS');
			expect(hand.isRoyalFlush()).toBeFalsy();
		});
	});

	describe('isFourOfAKind', () => {
		it('should be four of a kind', () => {
			const hand = new PokerHand('AS AH AD AC KS');
			expect(hand.isFourOfAKind()).toBeTruthy();
		});
		it('should not be four of a kind', () => {
			const hand = new PokerHand('AS AH AD KC KS');
			expect(hand.isFourOfAKind()).toBeFalsy();
		});
	});

	describe('isFullHouse', () => {
		it('should be full house', () => {
			const hand = new PokerHand('AS AH AD KC KS');
			expect(hand.isFullHouse()).toBeTruthy();
		});
		it('should not be four of a kind', () => {
			const hand = new PokerHand('AS AH AD AC KS');
			expect(hand.isFullHouse()).toBeFalsy();
		});
	});

	describe('isThreeOfAKind', () => {
		it('should be three of a kind', () => {
			const hand = new PokerHand('AS AH AD QC KS');
			expect(hand.isThreeOfAKind()).toBeTruthy();
		});
		it('should not be three of a kind', () => {
			const hand = new PokerHand('AS AH QD KC KS');
			expect(hand.isThreeOfAKind()).toBeFalsy();
		});
	});

	describe('isTwoPairs', () => {
		it('should be two pairs', () => {
			const hand = new PokerHand('AS AH QD QC KS');
			expect(hand.isTwoPairs()).toBeTruthy();
		});
		it('should not be two pairs', () => {
			const hand = new PokerHand('AS AH QD JC KS');
			expect(hand.isTwoPairs()).toBeFalsy();
		});
	});

	describe('isPair', () => {
		it('should be pair', () => {
			const hand = new PokerHand('AS AH JD QC KS');
			expect(hand.isPair()).toBeTruthy();
		});
		it('should not be pair', () => {
			const hand = new PokerHand('AS TH QD JC KS');
			expect(hand.isPair()).toBeFalsy();
		});
	});
});
