import { getRank, getSuit, rankValue } from '../src';

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
