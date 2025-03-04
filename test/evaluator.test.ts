import {
	getRank,
	getSuit,
	rankValue,
	evaluateHighCard
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
