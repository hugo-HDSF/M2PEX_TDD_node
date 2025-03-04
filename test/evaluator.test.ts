import {
	getRank,
	getSuit,
	rankValue,
	evaluateHighCard,
	evaluateOnePair,
	evaluateHand,
	evaluateThreeOfAKind,
	evaluateStraight,
	evaluateFlush,
	evaluateFullHouse,
	evaluateFourOfAKind,
	evaluateStraightFlush, evaluateRoyalFlush, HandType
} from '../src';
import { Hand } from '../src';

describe('Basic Card Functions', () => {
	test('getRank should extract the correct rank from a card', () => {
		expect(getRank('♦a')).toBe('a');
		expect(getRank('♥r')).toBe('r');
		expect(getRank('♠d')).toBe('d');
		expect(getRank('♣v')).toBe('v');
		expect(getRank('♦10')).toBe('10');
		expect(getRank('♥2')).toBe('2');
	});
	
	test('getSuit should extract the correct suit from a card', () => {
		expect(getSuit('♦a')).toBe('♦');
		expect(getSuit('♥r')).toBe('♥');
		expect(getSuit('♠d')).toBe('♠');
		expect(getSuit('♣v')).toBe('♣');
	});
	
	test('rankValue should return correct values for ranks', () => {
		expect(rankValue('a')).toBe(14);
		expect(rankValue('r')).toBe(13);
		expect(rankValue('d')).toBe(12);
		expect(rankValue('v')).toBe(11);
		expect(rankValue('10')).toBe(10);
		expect(rankValue('2')).toBe(2);
	});
});

describe('Hand Evaluation - High Card', () => {
	test('evaluateHighCard should rank hands correctly', () => {
		const hand1: Hand = ['♦a', '♥r', '♠10', '♣7', '♦3']; // Ace high
		const hand2: Hand = ['♦r', '♥d', '♠10', '♣9', '♦3']; // King high
		const hand3: Hand = ['♦a', '♥d', '♠10', '♣9', '♦3']; // Ace high but different kicker
		
		const score1 = evaluateHighCard(hand1);
		const score2 = evaluateHighCard(hand2);
		const score3 = evaluateHighCard(hand3);
		
		expect(score1).toBeGreaterThan(score2); // Ace high > King high
		expect(score1).toBeGreaterThan(score3); // Same Ace high but better kicker
		expect(score3).toBeGreaterThan(score2); // Ace high > King high
	});
});

describe('Hand Evaluation - One Pair', () => {
	test('evaluateOnePair should identify and rank one pair hands correctly', () => {
		const pairOfAces: Hand = ['♦a', '♥a', '♠10', '♣7', '♦3'];     // Pair of aces
		const pairOfKings: Hand = ['♦r', '♥r', '♠10', '♣9', '♦3'];     // Pair of kings
		const pairOfAcesLowerKicker: Hand = ['♦a', '♥a', '♠9', '♣8', '♦3']; // Pair of aces with lower kickers
		
		const score1 = evaluateOnePair(pairOfAces);
		const score2 = evaluateOnePair(pairOfKings);
		const score3 = evaluateOnePair(pairOfAcesLowerKicker);
		
		expect(score1).toBeGreaterThan(score2);     // Pair of aces > Pair of kings
		expect(score1).toBeGreaterThan(score3);     // Same pair but better kicker
		expect(score3).toBeGreaterThan(score2);     // Pair of aces > Pair of kings regardless of kicker
	});
	
	test('evaluateHand should correctly identify a pair', () => {
		const pairHand: Hand = ['♦a', '♥a', '♠10', '♣7', '♦3'];       // Pair of aces
		const highCardHand: Hand = ['♦a', '♥r', '♠10', '♣7', '♦3'];   // High card ace
		
		expect(evaluateHand(pairHand)).toBeGreaterThan(evaluateHand(highCardHand));
	});
	
	test('evaluateOnePair should throw error for non-pair hand', () => {
		const nonPairHand: Hand = ['♦a', '♥r', '♠10', '♣7', '♦3'];
		
		expect(() => evaluateOnePair(nonPairHand)).toThrow();
	});
});

describe('Hand Evaluation - Three of a Kind', () => {
	test('evaluateThreeOfAKind should identify and rank three of a kind hands correctly', () => {
		const threeAces: Hand = ['♦a', '♥a', '♠a', '♣9', '♦3'];
		const threeKings: Hand = ['♦r', '♥r', '♠r', '♣9', '♦3'];
		const threeAcesLowerKicker: Hand = ['♦a', '♥a', '♠a', '♣8', '♦2'];
		
		const score1 = evaluateThreeOfAKind(threeAces);
		const score2 = evaluateThreeOfAKind(threeKings);
		const score3 = evaluateThreeOfAKind(threeAcesLowerKicker);
		
		expect(score1).toBeGreaterThan(score2);
		expect(score1).toBeGreaterThan(score3);
		expect(score3).toBeGreaterThan(score2);
	});
	
	test('evaluateHand should correctly identify three of a kind', () => {
		const threeAces: Hand = ['♦a', '♥a', '♠a', '♣7', '♦3'];
		const pairAces: Hand = ['♦a', '♥a', '♠10', '♣7', '♦3'];
		
		expect(evaluateHand(threeAces)).toBeGreaterThan(evaluateHand(pairAces));
	});
	
	test('evaluateThreeOfAKind should throw error for non-three of a kind hand', () => {
		const nonThreeOfAKindHand: Hand = ['♦a', '♥r', '♠10', '♣7', '♦3'];
		
		expect(() => evaluateThreeOfAKind(nonThreeOfAKindHand)).toThrow();
	});
});

describe('Hand Evaluation - Straight', () => {
	test('evaluateStraight should identify and rank straight hands correctly', () => {
		const aceHighStraight: Hand = ['♦a', '♥r', '♠d', '♣v', '♦10'];
		const nineHighStraight: Hand = ['♦9', '♥8', '♠7', '♣6', '♦5'];
		const fiveHighStraight: Hand = ['♦5', '♥4', '♠3', '♣2', '♦a'];
		
		const score1 = evaluateStraight(aceHighStraight);
		const score2 = evaluateStraight(nineHighStraight);
		const score3 = evaluateStraight(fiveHighStraight);
		
		expect(score1).toBeGreaterThan(score2);
		expect(score2).toBeGreaterThan(score3);
		expect(score1).toBeGreaterThan(score3);
	});
	
	test('evaluateHand should correctly identify a straight', () => {
		const straight: Hand = ['♦9', '♥8', '♠7', '♣6', '♦5'];
		const threeOfAKind: Hand = ['♦a', '♥a', '♠a', '♣7', '♦3'];
		
		expect(evaluateHand(straight)).toBeGreaterThan(evaluateHand(threeOfAKind));
	});
	
	test('evaluateStraight should throw error for non-straight hand', () => {
		const nonStraightHand: Hand = ['♦a', '♥r', '♠10', '♣7', '♦3'];
		
		expect(() => evaluateStraight(nonStraightHand)).toThrow();
	});
});

describe('Hand Evaluation - Flush', () => {
	test('evaluateFlush should identify and rank flush hands correctly', () => {
		const flush1: Hand = ['♦9', '♦8', '♦7', '♦6', '♦5'];
		const flush2: Hand = ['♥10', '♥9', '♥8', '♥7', '♥6'];
		const flush3: Hand = ['♠a', '♠2', '♠3', '♠4', '♠5'];
		
		const score1 = evaluateFlush(flush1);
		const score2 = evaluateFlush(flush2);
		const score3 = evaluateFlush(flush3);
		
		expect(score2).toBeGreaterThan(score1);
		expect(score3).toBeGreaterThan(score2);
		expect(score3).toBeGreaterThan(score1);
	});
	
	test('evaluateHand should correctly identify a flush', () => {
		const flush: Hand = ['♦9', '♦8', '♦7', '♦6', '♦5'];
		const straight: Hand = ['♦9', '♥8', '♠7', '♣6', '♦5'];
		
		expect(evaluateHand(flush)).toBeGreaterThan(evaluateHand(straight));
	});
	
	test('evaluateFlush should throw error for non-flush hand', () => {
		const nonFlushHand: Hand = ['♦a', '♥r', '♠10', '♣7', '♦3'];
		
		expect(() => evaluateFlush(nonFlushHand)).toThrow();
	});
});

describe('Hand Evaluation - Full House', () => {
	test('evaluateFullHouse should identify and rank full house hands correctly', () => {
		const fullHouse1: Hand = ['♦a', '♥a', '♠a', '♣8', '♦8'];
		const fullHouse2: Hand = ['♦r', '♥r', '♠r', '♣9', '♦9'];
		const fullHouse3: Hand = ['♦a', '♥a', '♠a', '♣7', '♦7'];
		
		const score1 = evaluateFullHouse(fullHouse1);
		const score2 = evaluateFullHouse(fullHouse2);
		const score3 = evaluateFullHouse(fullHouse3);
		
		expect(score1).toBeGreaterThan(score2);
		expect(score1).toBeGreaterThan(score3);
		expect(score3).toBeGreaterThan(score2);
	});
	
	test('evaluateHand should correctly identify a full house', () => {
		const fullHouse: Hand = ['♦a', '♥a', '♠a', '♣r', '♦r'];
		// Use a non-consecutive flush instead of a straight flush
		const flush: Hand = ['♥a', '♥r', '♥10', '♥7', '♥2'];
		
		expect(evaluateHand(fullHouse)).toBeGreaterThan(evaluateHand(flush));
	});
	
	test('evaluateFullHouse should throw error for non-full house hand', () => {
		const nonFullHouseHand: Hand = ['♦a', '♥r', '♠10', '♣7', '♦3'];
		
		expect(() => evaluateFullHouse(nonFullHouseHand)).toThrow();
	});
});

describe('Hand Evaluation - Four of a Kind', () => {
	test('evaluateFourOfAKind should identify and rank four of a kind hands correctly', () => {
		const fourAces: Hand = ['♦a', '♥a', '♠a', '♣a', '♦r'];
		const fourKings: Hand = ['♦r', '♥r', '♠r', '♣r', '♦a'];
		const fourAcesLowerKicker: Hand = ['♦a', '♥a', '♠a', '♣a', '♦d'];
		
		const score1 = evaluateFourOfAKind(fourAces);
		const score2 = evaluateFourOfAKind(fourKings);
		const score3 = evaluateFourOfAKind(fourAcesLowerKicker);
		
		expect(score1).toBeGreaterThan(score2);
		expect(score1).toBeGreaterThan(score3);
		expect(score3).toBeGreaterThan(score2);
	});
	
	test('evaluateHand should correctly identify a four of a kind', () => {
		const fourOfAKind: Hand = ['♦a', '♥a', '♠a', '♣a', '♦r'];
		const fullHouse: Hand = ['♦a', '♥a', '♠a', '♣r', '♦r'];
		
		expect(evaluateHand(fourOfAKind)).toBeGreaterThan(evaluateHand(fullHouse));
	});
	
	test('evaluateFourOfAKind should throw error for non-four of a kind hand', () => {
		const nonFourOfAKindHand: Hand = ['♦a', '♥r', '♠10', '♣7', '♦3'];
		
		expect(() => evaluateFourOfAKind(nonFourOfAKindHand)).toThrow();
	});
});

describe('Hand Evaluation - Straight Flush', () => {
	test('evaluateStraightFlush should identify and rank straight flush hands correctly', () => {
		const kingHighStraightFlush: Hand = ['♦r', '♦d', '♦v', '♦10', '♦9'];
		const nineHighStraightFlush: Hand = ['♥9', '♥8', '♥7', '♥6', '♥5'];
		const fiveHighStraightFlush: Hand = ['♠5', '♠4', '♠3', '♠2', '♠a'];
		
		const score1 = evaluateStraightFlush(kingHighStraightFlush);
		const score2 = evaluateStraightFlush(nineHighStraightFlush);
		const score3 = evaluateStraightFlush(fiveHighStraightFlush);
		
		expect(score1).toBeGreaterThan(score2);
		expect(score2).toBeGreaterThan(score3);
	});
	
	test('evaluateHand should correctly identify a straight flush', () => {
		const straightFlush: Hand = ['♦9', '♦8', '♦7', '♦6', '♦5'];
		const fourOfAKind: Hand = ['♦a', '♥a', '♠a', '♣a', '♦r'];
		
		expect(evaluateHand(straightFlush)).toBeGreaterThan(evaluateHand(fourOfAKind));
	});
	
	test('evaluateStraightFlush should throw error for non-straight flush hand', () => {
		const nonStraightFlushHand: Hand = ['♦a', '♥r', '♠10', '♣7', '♦3'];
		
		expect(() => evaluateStraightFlush(nonStraightFlushHand)).toThrow();
	});
});

describe('Hand Evaluation - Royal Flush', () => {
	test('evaluateRoyalFlush should identify a royal flush hand correctly', () => {
		const royalFlush: Hand = ['♦a', '♦r', '♦d', '♦v', '♦10'];
		const notRoyalFlushDifferentSuit: Hand = ['♦a', '♥r', '♦d', '♦v', '♦10'];
		const straightFlush: Hand = ['♦r', '♦d', '♦v', '♦10', '♦9'];
		
		const score = evaluateRoyalFlush(royalFlush);
		
		expect(score).toBe(HandType.RoyalFlush * 10 ** 14);
		expect(() => evaluateRoyalFlush(notRoyalFlushDifferentSuit)).toThrow();
		expect(() => evaluateRoyalFlush(straightFlush)).toThrow();
	});
	
	test('evaluateHand should correctly identify a royal flush', () => {
		const royalFlush: Hand = ['♦a', '♦r', '♦d', '♦v', '♦10'];
		const straightFlush: Hand = ['♦r', '♦d', '♦v', '♦10', '♦9'];
		
		expect(evaluateHand(royalFlush)).toBeGreaterThan(evaluateHand(straightFlush));
	});
});
