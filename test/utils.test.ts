import { getRankFrequencies, isSameSuit, sortByRank, isStraight } from '../src/utils';
import { Hand } from '../src';

describe('Card Utility Functions', () => {
  test('getRankFrequencies should count rank occurrences correctly', () => {
    const hand: Hand = ['♦a', '♥a', '♠r', '♣d', '♦v'];
    const frequencies = getRankFrequencies(hand);
    
    expect(frequencies.get('a')).toBe(2);
    expect(frequencies.get('r')).toBe(1);
    expect(frequencies.get('d')).toBe(1);
    expect(frequencies.get('v')).toBe(1);
  });
  
  test('isSameSuit should detect when all cards have the same suit', () => {
    const sameSuitHand: Hand = ['♥a', '♥r', '♥d', '♥v', '♥10'];
    const mixedSuitHand: Hand = ['♦a', '♥r', '♠d', '♣v', '♦10'];
    
    expect(isSameSuit(sameSuitHand)).toBe(true);
    expect(isSameSuit(mixedSuitHand)).toBe(false);
  });
  
  test('sortByRank should sort cards by rank in descending order', () => {
    const hand: Hand = ['♦10', '♥a', '♠2', '♣r', '♦v'];
    const sorted = sortByRank(hand);
    
    expect(sorted[0]).toBe('♥a');
    expect(sorted[1]).toBe('♣r');
    expect(sorted[2]).toBe('♦v');
    expect(sorted[3]).toBe('♦10');
    expect(sorted[4]).toBe('♠2');
  });
  
  test('isStraight should detect sequential ranks', () => {
    // Regular straight
    const straight: Hand = ['♦10', '♥9', '♠8', '♣7', '♦6'];
    // Non-straight
    const nonStraight: Hand = ['♦a', '♥r', '♠10', '♣7', '♦3'];
    // Ace-low straight
    const aceLowStraight: Hand = ['♦a', '♥2', '♠3', '♣4', '♦5'];
    
    expect(isStraight(straight)).toBe(true);
    expect(isStraight(nonStraight)).toBe(false);
    expect(isStraight(aceLowStraight)).toBe(true);
  });
});
