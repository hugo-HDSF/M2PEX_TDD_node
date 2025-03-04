import { evaluatePokerHands } from '../src';
import { Hand } from '../src';

describe('Poker Hand Evaluator  - Full Rankings', () => {
  test('evaluatePokerHands should correctly rank various poker hands', () => {
    // Create a variety of hands
    const royalFlush: Hand = ['♦a', '♦r', '♦d', '♦v', '♦10'];
    const straightFlush: Hand = ['♥9', '♥8', '♥7', '♥6', '♥5'];
    const fourOfAKind: Hand = ['♦a', '♥a', '♠a', '♣a', '♦r'];
    const fullHouse: Hand = ['♦a', '♥a', '♠a', '♣r', '♦r'];
    const flush: Hand = ['♥a', '♥r', '♥10', '♥7', '♥2'];
    const straight: Hand = ['♦a', '♥r', '♠d', '♣v', '♦10'];
    const threeOfAKind: Hand = ['♦a', '♥a', '♠a', '♣7', '♦3'];
    const twoPair: Hand = ['♦a', '♥a', '♠r', '♣r', '♦3'];
    const onePair: Hand = ['♦a', '♥a', '♠10', '♣7', '♦3'];
    const highCard: Hand = ['♦a', '♥r', '♠10', '♣7', '♦3'];
    
    // Evaluate all hands
    const rankedHands = evaluatePokerHands([
      highCard, onePair, twoPair, threeOfAKind, straight,
      flush, fullHouse, fourOfAKind, straightFlush, royalFlush
    ]);
    
    // Sort by score in descending order
    const sortedHands = [...rankedHands].sort((a, b) => b[1] - a[1]);
    
    // Check that the ranking is correct
    expect(sortedHands[0][0]).toEqual(royalFlush);
    expect(sortedHands[1][0]).toEqual(straightFlush);
    expect(sortedHands[2][0]).toEqual(fourOfAKind);
    expect(sortedHands[3][0]).toEqual(fullHouse);
    expect(sortedHands[4][0]).toEqual(flush);
    expect(sortedHands[5][0]).toEqual(straight);
    expect(sortedHands[6][0]).toEqual(threeOfAKind);
    expect(sortedHands[7][0]).toEqual(twoPair);
    expect(sortedHands[8][0]).toEqual(onePair);
    expect(sortedHands[9][0]).toEqual(highCard);
  });
});
