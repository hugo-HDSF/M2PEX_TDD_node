import { Hand, Score } from './types';
import { evaluateHand } from './evaluator';

/**
 * Main function to evaluate poker hands
 * @param hands An array of hands to evaluate
 * @returns An array of hands with their scores
 */
export function evaluatePokerHands(hands: Hand[]): Score[] {
  return hands.map(hand => [hand, evaluateHand(hand)]);
}

export * from './types';
export * from './evaluator';
